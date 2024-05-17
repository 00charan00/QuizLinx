import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AttendQuiz({ quizId }) {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8080/quiz/${quizId}`)
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
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Quiz</h2>
            <div>
                {questions.map(question => (
                    <div key={question.questionid} className="border p-4 mb-4 rounded shadow">
                        <h3 className="text-lg font-semibold">{question.question}</h3>
                        <div className="mt-2">
                            <input
                                type="radio"
                                id={`option1_${question.questionid}`}
                                name={`question_${question.questionid}`}
                                value={question.opt1}
                                checked={answers[question.questionid] === question.opt1}
                                onChange={() => handleAnswerChange(question.questionid, question.opt1)}
                                className="mr-2"
                            />
                            <label htmlFor={`option1_${question.questionid}`} className="text-gray-700">{question.opt1}</label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="radio"
                                id={`option2_${question.questionid}`}
                                name={`question_${question.questionid}`}
                                value={question.opt2}
                                checked={answers[question.questionid] === question.opt2}
                                onChange={() => handleAnswerChange(question.questionid, question.opt2)}
                                className="mr-2"
                            />
                            <label htmlFor={`option2_${question.questionid}`} className="text-gray-700">{question.opt2}</label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="radio"
                                id={`option3_${question.questionid}`}
                                name={`question_${question.questionid}`}
                                value={question.opt3}
                                checked={answers[question.questionid] === question.opt3}
                                onChange={() => handleAnswerChange(question.questionid, question.opt3)}
                                className="mr-2"
                            />
                            <label htmlFor={`option3_${question.questionid}`} className="text-gray-700">{question.opt3}</label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="radio"
                                id={`option4_${question.questionid}`}
                                name={`question_${question.questionid}`}
                                value={question.opt4}
                                checked={answers[question.questionid] === question.opt4}
                                onChange={() => handleAnswerChange(question.questionid, question.opt4)}
                                className="mr-2"
                            />
                            <label htmlFor={`option4_${question.questionid}`} className="text-gray-700">{question.opt4}</label>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Submit</button>
            <div className="mt-4 text-xl">Score: {score}</div>
        </div>
    );
}

export default AttendQuiz;
