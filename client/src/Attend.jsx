import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Attend({ onSelectQuiz }) {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/quizzes')
            .then(res => {
                setQuizzes(res.data);
            })
            .catch(error => {
                console.error('Error fetching quizzes:', error);
            });
    }, []);

    return (
        <div>
            <h2>Available Quizzes</h2>
            <div>
                {quizzes.map(quiz => (
                    <div key={quiz.quizid} className="border p-4 mb-4 cursor-pointer" onClick={() => onSelectQuiz(quiz.quizid)}>
                        <h3>{quiz.quizname}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Attend;
