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

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1030",
    database: "quizlinx"
});

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

//charan

app.post('/quiz', (req, res) => {
    const { quizName, questions } = req.body;

    // Insert quiz into database
    db.query('INSERT INTO quizzes (quiz_name) VALUES (?)', [quizName], (err, result) => {
        if (err) {
            console.error('Error inserting quiz:', err);
            res.status(500).send('Error creating quiz');
            return;
        }

        const quizId = result.insertId;

        // Insert questions into database
        const questionValues = questions.map(question => [quizId, question.question]);
        db.query('INSERT INTO questions (quiz_id, question_text) VALUES ?', [questionValues], (err, result) => {
            if (err) {
                console.error('Error inserting questions:', err);
                res.status(500).send('Error creating quiz');
                return;
            }

            const questionIds = result.insertId;

            // Insert options into database
            const optionValues = [];
            questions.forEach((question, index) => {
                question.options.forEach((option, optionIndex) => {
                    // Check if the current optionIndex is the correctOption
                    const isCorrect = optionIndex + 1 === question.correctOption ? 1 : 0;
                    optionValues.push([questionIds[index], option, isCorrect]);
                });
            });

            db.query('INSERT INTO options (question_id, option_text, is_correct) VALUES ?', [optionValues], (err, result) => {
                if (err) {
                    console.error('Error inserting options:', err);
                    res.status(500).send('Error creating quiz');
                    return;
                }

                res.status(201).send('Quiz created successfully');
            });
        });
    });
});






app.get('/quiz/:quizId', (req, res) => {
    const quizId = req.params.quizId;
    const sql = `
    SELECT q.quiz_name, 
           qn.id AS question_id, 
           qn.question_text, 
           o.id AS option_id, 
           o.option_text 
      FROM quizzes q
           INNER JOIN questions qn ON q.quiz_id = qn.quiz_id
           INNER JOIN options o ON qn.id = o.question_id
      WHERE q.quiz_id = ?
  `;
    db.query(sql, [quizId], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});


// backend/server.js

// After the existing code

// Submit quiz
app.post('/quiz/submit', (req, res) => {
    const selectedOptions = req.body;

    // Assuming selectedOptions is an object where keys are question ids and values are selected option ids
    let score = 0;

    // Loop through selected options and check if they are correct
    for (const questionId in selectedOptions) {
        const selectedOptionId = selectedOptions[questionId];

        // Retrieve correct option id for the question from the database
        const sql = `SELECT is_correct FROM options WHERE question_id = ? AND id = ?`;
        db.query(sql, [questionId, selectedOptionId], (err, result) => {
            if (err) {
                throw err;
            }

            // If the selected option is correct, increment the score
            if (result.length > 0 && result[0].is_correct === 1) {
                score++;
            }
        });
    }

    // Send the score back to the frontend
    res.json({ score });
});











app.get('/',(req,res)=>{
    //function to check if backend is running in browser
    res.json("Hii charan");
})
app.listen(8080, () => {
    console.log("Listening in 8080");
});



