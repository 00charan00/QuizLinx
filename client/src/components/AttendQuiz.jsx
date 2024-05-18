import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";


function AttendQuiz({ quizId }) {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {
        const handleBlur = () => {
            document.title = "Tab Switched";

            localStorage.removeItem("token");
            localStorage.removeItem("userData");
            navigate('/');

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
    }, []);

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
        setAnswers(prevState => ({
            ...prevState,
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
    };

    return (
        <div>
            <Navbar/>
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Quiz</h2>
                <div>
                    {questions.map(question => (
                        <div key={question.questionid} className="border p-4 mb-4 rounded shadow">
                            <h3 className="text-lg font-semibold">{question.question}</h3>
                            <div className="mt-2">
                                {['opt1', 'opt2', 'opt3', 'opt4'].map(option => (
                                    <div key={option}>
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
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Submit</button>
                <div className="mt-4 text-xl">Score: {score}</div>
            </div>
            <Footer/>
        </div>
    );
}

export default AttendQuiz;
