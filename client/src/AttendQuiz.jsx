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
        <div>
            <h2>Quiz</h2>
            <div>
                {questions.map(question => (
                    <div key={question.questionid} className="border p-4 mb-4">
                        <h3>{question.question}</h3>
                        <div>
                            <input
                                type="radio"
                                id={`option1_${question.questionid}`}
                                name={`question_${question.questionid}`}
                                value={question.opt1}
                                checked={answers[question.questionid] === question.opt1}
                                onChange={() => handleAnswerChange(question.questionid, question.opt1)}
                            />
                            <label htmlFor={`option1_${question.questionid}`}>{question.opt1}</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id={`option2_${question.questionid}`}
                                name={`question_${question.questionid}`}
                                value={question.opt2}
                                checked={answers[question.questionid] === question.opt2}
                                onChange={() => handleAnswerChange(question.questionid, question.opt2)}
                            />
                            <label htmlFor={`option2_${question.questionid}`}>{question.opt2}</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id={`option3_${question.questionid}`}
                                name={`question_${question.questionid}`}
                                value={question.opt3}
                                checked={answers[question.questionid] === question.opt3}
                                onChange={() => handleAnswerChange(question.questionid, question.opt3)}
                            />
                            <label htmlFor={`option3_${question.questionid}`}>{question.opt3}</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id={`option4_${question.questionid}`}
                                name={`question_${question.questionid}`}
                                value={question.opt4}
                                checked={answers[question.questionid] === question.opt4}
                                onChange={() => handleAnswerChange(question.questionid, question.opt4)}
                            />
                            <label htmlFor={`option4_${question.questionid}`}>{question.opt4}</label>
                        </div>

                        {/* Repeat similar pattern for other options */}
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit}>Submit</button>
            <div>Score: {score}</div>
        </div>
    );
}

export default AttendQuiz;
