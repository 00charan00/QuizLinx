const express = require("express");
const bodyParser = require('body-parser');
const mysql = require("mysql2");
const cookieparser = require("cookie-parser");
const session = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const cors = require("cors");
const {hashPassword} = require("mysql/lib/protocol/Auth");
const app = express();
const setRounds =10;
app.use(express.json());
app.use(cors({origin:'*'}));
app.use(cookieparser());
app.use(bodyParser.json());

const db=mysql.createConnection(`mysql://avnadmin:AVNS_wqJEv19TwrJJCpoRrZE@mysql-1501fbdc-charansdb.a.aivencloud.com:20259/quizlinx`);


// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1030",
//     database: "quizlinx"
// });

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log("Connected to database");
});
//session
app.use(
    session({
        key:'username',
        secret:'password',
        resave: false,
        saveUninitialized: false,
        cookie:{
            expire:60*10,
        }
    })
)

//register

app.post('/register',(req,res)=>{
    console.log(req.body);
    const name= req.body?.name;
    const email=req.body?.email;
    const password=req.body?.password;
    bcryptjs.hash(password,setRounds,(err,hash)=>{
        if(err){
            console.log(err)
        }

        db.query('INSERT INTO registertable(name, email, password) VALUES (?,?,?)',
            [name, email, hash],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    console.log(result);
                    return res.status(200).json({ message: 'Registration Successful' });
                }
            }
        );
    })
});

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.send("We need token give it next time");
    } else {
        jwt.verify(token, "secret", (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: "Failed to authenticate" });
            } else {
                req.mail = decoded.id;
                next();
            }
        });
    }
};

app.get('/isAuth',verifyJWT,(req,res)=>{
    res.send("Authenticeted Successfully");
})

app.post('/login', async (req, res) => {
    const email = req.body?.email;
    const password = req.body?.password;

    db.query(
        "SELECT * FROM registertable WHERE email=?",
        [email],
        (err, result) => {
            if (err) {
                console.log("Error:", err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            if (result.length > 0) {
                bcryptjs.compare(password, result[0].password, (err, response) => {
                    if (response) {
                        const id  = result[0].id;
                        const token = jwt.sign({ id }, "secret", { expiresIn: 5 });
                        res.json({ auth: true, token: token, result: result[0], message: 'Login Successful' });
                    } else {
                        res.status(401).json({ message: 'Invalid Credentials' });
                    }
                });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        }
    );
});


app.use(bodyParser.urlencoded({ extended: true }));


app.post('/create-quiz', (req, res) => {
    const { quizname, questions } = req.body;

    // Insert quiz
    db.query('INSERT INTO quiz (quizname) VALUES (?)', [quizname], (err, result) => {
        if (err) throw err;

        const quizId = result.insertId;

        // Insert questions
        questions.forEach((question) => {
            db.query('INSERT INTO questions (question, opt1, opt2, opt3, opt4, ans, quizid) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [question.question, question.opt1, question.opt2, question.opt3, question.opt4, question.ans, quizId], (err, result) => {
                    if (err) throw err;
                });
        });

        res.send('Quiz created successfully');
    });
});





// app.post('/create-quiz', (req, res) => {
//     const { quizname, questions, time_limit } = req.body; // Include time_limit in the request body
//
//     // Insert quiz with time_limit
//     db.query('INSERT INTO quiz (quizname, time_limit) VALUES (?, ?)', [quizname, time_limit], (err, result) => {
//         if (err) throw err;
//
//         const quizId = result.insertId;
//
//         // Insert questions
//         questions.forEach((question) => {
//             db.query(
//                 'INSERT INTO questions (question, opt1, opt2, opt3, opt4, ans, quizid) VALUES (?, ?, ?, ?, ?, ?, ?)',
//                 [question.question, question.opt1, question.opt2, question.opt3, question.opt4, question.ans, quizId],
//                 (err, result) => {
//                     if (err) throw err;
//                 }
//             );
//         });
//
//         res.send('Quiz created successfully');
//     });
// });




app.get('/quizzes', (req, res) => {
    db.query('SELECT * FROM quiz', (err, result) => {
        if (err) {
            res.status(500).send('Error fetching quizzes');
            return;
        }
        res.json(result);
    });
});


app.get('/quiz/:quizid', (req, res) => {
    const { quizid } = req.params;
    db.query('SELECT * FROM questions WHERE quizid = ?', [quizid], (err, result) => {
        if (err) {
            res.status(500).send('Error fetching questions');
            return;
        }
        res.json(result);
    });
});



// // Fetch all quizzes
// app.get('/quizzes', (req, res) => {
//     db.query('SELECT * FROM quiz', (err, result) => {
//         if (err) {
//             res.status(500).send('Error fetching quizzes');
//             return;
//         }
//         res.json(result);
//     });
// });
//
// // Fetch quiz details including questions and time_limit
// app.get('/quiz/:quizid', (req, res) => {
//     const { quizid } = req.params;
//
//     // Fetch quiz details
//     db.query('SELECT * FROM quiz WHERE quizid = ?', [quizid], (err, quizResult) => {
//         if (err) {
//             res.status(500).send('Error fetching quiz');
//             return;
//         }
//
//         if (quizResult.length === 0) {
//             return res.status(404).send('Quiz not found');
//         }
//
//         const quiz = quizResult[0];
//
//         // Fetch questions for the quiz
//         db.query('SELECT * FROM questions WHERE quizid = ?', [quizid], (err, questionsResult) => {
//             if (err) {
//                 res.status(500).send('Error fetching questions');
//                 return;
//             }
//
//             res.json({
//                 quizname: quiz.quizname,
//                 time_limit: quiz.time_limit,
//                 questions: questionsResult
//             });
//         });
//     });
// });



app.post('/results', (req, res) => {
    const { name, email, marks } = req.body;

    const query = 'INSERT INTO results (name, email, marks) VALUES (?, ?, ?)';
    db.query(query, [name, email, marks], (err, result) => {
        if (err) {
            console.error('Error inserting results:', err);
            res.status(500).send('Error saving results');
            return;
        }
        res.status(200).send('Results saved successfully');
    });
});


app.get('/getresults', (req, res) => {
    const query = 'SELECT * FROM results';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching results:', err);
            res.status(500).send('Error fetching results');
            return;
        }
        res.status(200).json(results);
    });
});








app.get('/',(req,res)=>{
    //function to check if backend is running in browser
    res.json("Hii charan, backend is running");
})
app.listen(8080, () => {
    console.log("Listening in 8080");
});



