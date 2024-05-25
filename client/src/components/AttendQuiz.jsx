import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function AttendQuiz({ quizId }) {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [isNavigating, setIsNavigating] = useState(false);
    const answersRef = useRef({});
    const submitRef = useRef(false);
    const navigate = useNavigate();

    const storedUserData = localStorage.getItem("userData");
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;

    const saveResults = useCallback(async () => {
        let totalScore = 0;
        questions.forEach(question => {
            if (answersRef.current[question.questionid] === question.ans) {
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

            try {
                await axios.post('https://quizlinx.onrender.com/results', resultData);
                console.log('Result saved successfully');
            } catch (error) {
                console.error('Error saving result:', error);
            }
        } else {
            console.log('No user data');
        }
    }, [questions, parsedUserData]);

    useEffect(() => {
        const handleBlur = async () => {
            document.title = "Tab Switched";
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
            if (!submitRef.current) {
                submitRef.current = true;
                await saveResults();
                setIsNavigating(true);
            }
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
    }, [saveResults]);

    useEffect(() => {
        if (isNavigating) {
            navigate('/');
        }
    }, [isNavigating, navigate]);

    useEffect(() => {
        axios.get(`https://quizlinx.onrender.com/quiz/${quizId}`)
            .then(res => {
                setQuestions(res.data);
                const initialAnswers = {};
                res.data.forEach(question => {
                    initialAnswers[question.questionid] = '';
                });
                setAnswers(initialAnswers);
                answersRef.current = initialAnswers;
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });
    }, [quizId]);

    const handleAnswerChange = (questionId, answer) => {
        setAnswers(prevAnswers => {
            const newAnswers = {
                ...prevAnswers,
                [questionId]: answer,
            };
            answersRef.current = newAnswers;
            return newAnswers;
        });
    };

    const handleSubmit = async () => {
        if (!submitRef.current) {
            submitRef.current = true;
            await saveResults();
        }
    };

    return (
        <div>
            <Navbar />
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
                        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={() => { navigate('/home') }}>Home</button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default AttendQuiz;





// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import axios from 'axios';
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import { useNavigate } from "react-router-dom";
// import { format, addSeconds } from 'date-fns';
//
// function AttendQuiz({ quizId }) {
//     const [questions, setQuestions] = useState([]);
//     const [answers, setAnswers] = useState({});
//     const [submitted, setSubmitted] = useState(false);
//     const [score, setScore] = useState(0);
//     const [isNavigating, setIsNavigating] = useState(false);
//     const [timeLeft, setTimeLeft] = useState(0); // Time left in seconds
//     const [timerExpired, setTimerExpired] = useState(false);
//     const timerIntervalRef = useRef(null);
//     const answersRef = useRef({});
//     const submitRef = useRef(false);
//     const navigate = useNavigate();
//
//     const storedUserData = localStorage.getItem("userData");
//     const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
//
//     const saveResults = useCallback(async () => {
//         let totalScore = 0;
//         questions.forEach(question => {
//             if (answersRef.current[question.questionid] === question.ans) {
//                 totalScore++;
//             }
//         });
//         setScore(totalScore);
//         setSubmitted(true);
//
//         if (parsedUserData) {
//             const resultData = {
//                 name: parsedUserData.name,
//                 email: parsedUserData.email,
//                 marks: totalScore.toString()
//             };
//
//             try {
//                 await axios.post('https://quizlinx.onrender.com/results', resultData);
//                 console.log('Result saved successfully');
//             } catch (error) {
//                 console.error('Error saving result:', error);
//             }
//         } else {
//             console.log('No user data');
//         }
//     }, [questions, parsedUserData]);
//
//     useEffect(() => {
//         const handleBlur = async () => {
//             document.title = "Tab Switched";
//             localStorage.removeItem("token");
//             localStorage.removeItem("userData");
//             if (!submitRef.current) {
//                 submitRef.current = true;
//                 await saveResults();
//                 setIsNavigating(true);
//             }
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
//     }, [saveResults]);
//
//     useEffect(() => {
//         if (isNavigating) {
//             navigate('/');
//         }
//     }, [isNavigating, navigate]);
//
//     useEffect(() => {
//         axios.get(`https://quizlinx.onrender.com/quiz/${quizId}`)
//             .then(res => {
//                 const { questions, time_limit } = res.data;
//                 setQuestions(questions);
//                 setTimeLeft(time_limit * 60); // Convert minutes to seconds
//                 const initialAnswers = {};
//                 questions.forEach(question => {
//                     initialAnswers[question.questionid] = '';
//                 });
//                 setAnswers(initialAnswers);
//                 answersRef.current = initialAnswers;
//
//                 // Start the timer
//                 timerIntervalRef.current = setInterval(() => {
//                     setTimeLeft(prevTimeLeft => {
//                         if (prevTimeLeft <= 1) {
//                             clearInterval(timerIntervalRef.current);
//                             setTimerExpired(true);
//                             if (!submitRef.current) {
//                                 submitRef.current = true;
//                                 saveResults();
//                             }
//                             return 0;
//                         }
//                         return prevTimeLeft - 1;
//                     });
//                 }, 1000);
//             })
//             .catch(error => {
//                 console.error('Error fetching questions:', error);
//             });
//
//         return () => clearInterval(timerIntervalRef.current);
//     }, [quizId, saveResults]);
//
//     useEffect(() => {
//         if (timerExpired && !submitted) {
//             saveResults();
//         }
//     }, [timerExpired, submitted, saveResults]);
//
//     const handleAnswerChange = (questionId, answer) => {
//         setAnswers(prevAnswers => {
//             const newAnswers = {
//                 ...prevAnswers,
//                 [questionId]: answer,
//             };
//             answersRef.current = newAnswers;
//             return newAnswers;
//         });
//     };
//
//     const handleSubmit = async () => {
//         if (!submitRef.current) {
//             submitRef.current = true;
//             clearInterval(timerIntervalRef.current);
//             await saveResults();
//         }
//     };
//
//     const formatTimeLeft = () => {
//         const minutes = Math.floor(timeLeft / 60);
//         const seconds = timeLeft % 60;
//         return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
//     };
//
//     return (
//         <div>
//             <Navbar />
//             <div className="container mx-auto p-4">
//                 <h2 className="text-2xl font-bold mb-4">Quiz</h2>
//                 <div>
//                     <div className="text-right mb-4">
//                         <span className="text-xl font-semibold">Time Left: {formatTimeLeft()}</span>
//                     </div>
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
//                         <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={() => { navigate('/home') }}>Home</button>
//                     </div>
//                 )}
//             </div>
//             <Footer />
//         </div>
//     );
// }
//
// export default AttendQuiz;
