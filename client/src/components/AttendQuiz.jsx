// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import { useNavigate } from "react-router-dom";
//
// function AttendQuiz({ quizId }) {
//     const [questions, setQuestions] = useState([]);
//     const [answers, setAnswers] = useState({});
//     const [submitted, setSubmitted] = useState(false);
//     const [score, setScore] = useState(0);
//     const navigate = useNavigate();
//
//     const storedUserData = localStorage.getItem("userData");
//     const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
//
//     useEffect(() => {
//         const handleBlur = () => {
//             document.title = "Tab Switched";
//             localStorage.removeItem("token");
//             localStorage.removeItem("userData");
//             navigate('/');
//         };
//
//         const handleFocus = () => {
//             document.title = "Focus";
//         };
//
//         window.addEventListener("blur", handleBlur);
//         window.addEventListener("focus", handleFocus);
//
//         return () => {
//             window.removeEventListener("blur", handleBlur);
//             window.removeEventListener("focus", handleFocus);
//         };
//     }, [navigate]);
//
//     useEffect(() => {
//         axios.get(`https://quizlinx.onrender.com/quiz/${quizId}`)
//             .then(res => {
//                 setQuestions(res.data);
//                 const initialAnswers = {};
//                 res.data.forEach(question => {
//                     initialAnswers[question.questionid] = '';
//                 });
//                 setAnswers(initialAnswers);
//             })
//             .catch(error => {
//                 console.error('Error fetching questions:', error);
//             });
//     }, [quizId]);
//
//     const handleAnswerChange = (questionId, answer) => {
//         setAnswers(prevAnswers => ({
//             ...prevAnswers,
//             [questionId]: answer,
//         }));
//     };
//
//     const handleSubmit = () => {
//         let totalScore = 0;
//         questions.forEach(question => {
//             if (answers[question.questionid] === question.ans) {
//                 totalScore++;
//             }
//         });
//         setScore(totalScore);
//         console.log(parsedUserData ? parsedUserData.name : 'No user data');
//         setSubmitted(true);
//     };
//
//     return (
//         <div>
//             <Navbar/>
//             <div className="container mx-auto p-4">
//                 <h2 className="text-2xl font-bold mb-4">Quiz</h2>
//                 <div>
//                     {questions.map(question => {
//                         const isWrong = submitted && answers[question.questionid] !== question.ans;
//                         return (
//                             <div
//                                 key={question.questionid}
//                                 className={`border p-4 mb-4 rounded shadow ${isWrong ? 'bg-red-200' : ''}`}
//                             >
//                                 <h3 className="text-lg font-semibold">{question.question}</h3>
//                                 <div className="mt-2">
//                                     {['opt1', 'opt2', 'opt3', 'opt4'].map(option => {
//                                         const isCorrect = submitted && question[option] === question.ans;
//                                         const isSelectedWrong = submitted && answers[question.questionid] === question[option] && question[option] !== question.ans;
//                                         return (
//                                             <div
//                                                 key={option}
//                                                 className={`mb-2 ${isCorrect ? 'font-bold' : ''} ${isCorrect ? 'text-green-600' : ''} ${isSelectedWrong ? 'text-red-800' : ''} `}
//                                             >
//                                                 <input
//                                                     type="radio"
//                                                     id={`${option}_${question.questionid}`}
//                                                     name={`question_${question.questionid}`}
//                                                     value={question[option]}
//                                                     checked={answers[question.questionid] === question[option]}
//                                                     onChange={() => handleAnswerChange(question.questionid, question[option])}
//                                                     className="mr-2"
//                                                 />
//                                                 <label htmlFor={`${option}_${question.questionid}`} className="text-gray-700">{question[option]}</label>
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                                 {submitted && answers[question.questionid] !== question.ans && (
//                                     <div className="mt-2 font-bold text-xl text-green-600">
//                                         Correct Answer: {question.ans}
//                                     </div>
//                                 )}
//                             </div>
//                         );
//                     })}
//                 </div>
//                 {!submitted && (
//                     <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
//                         Submit
//                     </button>
//                 )}
//
//                 {submitted && (
//                     <div>
//                         <div className="mt-4 text-xl">Score: {score}</div>
//                         <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={()=>{navigate('/home')}}>Home</button>
//                     </div>
//                 )}
//             </div>
//             <Footer/>
//         </div>
//     );
// }
//
// export default AttendQuiz;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function AttendQuiz({ quizId }) {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    const storedUserData = localStorage.getItem("userData");
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;

    useEffect(() => {
        const handleBlur = () => {
            document.title = "Tab Switched";
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
            navigate('/');
            handleSubmit();
        };

        const handleFocus = () => {
            document.title = "Focus";
        };

        window.addEventListener("blur", handleBlur);
        window.addEventListener("focus", handleFocus);

        return () => {
            window.removeEventListener("blur", handleBlur);
            window.removeEventListener("focus", handleFocus);
        };
    }, [navigate]);

    useEffect(() => {
        axios.get(`https://quizlinx.onrender.com/quiz/${quizId}`)
            .then(res => {
                setQuestions(res.data);
                const initialAnswers = {};
                res.data.forEach(question => {
                    initialAnswers[question.questionid] = '';
                });
                setAnswers(initialAnswers);
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });
    }, [quizId]);

    const handleAnswerChange = (questionId, answer) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const handleSubmit = () => {
        let totalScore = 0;
        questions.forEach(question => {
            if (answers[question.questionid] === question.ans) {
                totalScore++;
            }
        });
        setScore(totalScore);
        setSubmitted(true);

        if (parsedUserData) {
            const resultData = {
                name: parsedUserData.name,
                email: parsedUserData.email,
                marks: totalScore.toString()
            };

            axios.post('https://quizlinx.onrender.com/results', resultData)
                .then(response => {
                    console.log('Result saved successfully:', response.data);
                })
                .catch(error => {
                    console.error('Error saving result:', error);
                });
        } else {
            console.log('No user data');
        }
    };

    return (
        <div>
            <Navbar/>
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Quiz</h2>
                <div>
                    {questions.map(question => {
                        const isWrong = submitted && answers[question.questionid] !== question.ans;
                        return (
                            <div
                                key={question.questionid}
                                className={`border p-4 mb-4 rounded shadow ${isWrong ? 'bg-red-200' : ''}`}
                            >
                                <h3 className="text-lg font-semibold">{question.question}</h3>
                                <div className="mt-2">
                                    {['opt1', 'opt2', 'opt3', 'opt4'].map(option => {
                                        const isCorrect = submitted && question[option] === question.ans;
                                        const isSelectedWrong = submitted && answers[question.questionid] === question[option] && question[option] !== question.ans;
                                        return (
                                            <div
                                                key={option}
                                                className={`mb-2 ${isCorrect ? 'font-bold' : ''} ${isCorrect ? 'text-green-600' : ''} ${isSelectedWrong ? 'text-red-800' : ''} `}
                                            >
                                                <input
                                                    type="radio"
                                                    id={`${option}_${question.questionid}`}
                                                    name={`question_${question.questionid}`}
                                                    value={question[option]}
                                                    checked={answers[question.questionid] === question[option]}
                                                    onChange={() => handleAnswerChange(question.questionid, question[option])}
                                                    className="mr-2"
                                                />
                                                <label htmlFor={`${option}_${question.questionid}`} className="text-gray-700">{question[option]}</label>
                                            </div>
                                        );
                                    })}
                                </div>
                                {submitted && answers[question.questionid] !== question.ans && (
                                    <div className="mt-2 font-bold text-xl text-green-600">
                                        Correct Answer: {question.ans}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                {!submitted && (
                    <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                        Submit
                    </button>
                )}

                {submitted && (
                    <div>
                        <div className="mt-4 text-xl">Score: {score}</div>
                        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={()=>{navigate('/home')}}>Home</button>
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
}

export default AttendQuiz;
