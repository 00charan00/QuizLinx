// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [quiz, setQuiz] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [score, setScore] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchQuizData();
    }, []);

    const fetchQuizData = async () => {
        try {
            const quizId = 1; // Change quiz id as needed
            const response = await axios.get(`http://localhost:8080/quiz/${quizId}`);
            setQuiz(response.data);
        } catch (error) {
            console.error('Error fetching quiz data:', error);
            setError('Failed to fetch quiz data');
        }
    };

    const handleOptionSelect = (questionId, optionId) => {
        setSelectedOptions({ ...selectedOptions, [questionId]: optionId });
    };

    const handleSubmitQuiz = async () => {
        try {
            const response = await axios.post('http://localhost:8080/quiz/submit', selectedOptions);
            setScore(response.data.score);
        } catch (error) {
            console.error('Error submitting quiz:', error);
            setError('Failed to submit quiz');
        }
    };

    return (
        <div className="App">
            <h1>Quiz App</h1>
            {error && <p>{error}</p>}
            {quiz ? (
                <>
                    <h2>{quiz[0].quiz_name}</h2>
                    {quiz.map((question) => (
                        <div key={question.question_id}>
                            <p>{question.question_text}</p>
                            {question.options.map((option) => (
                                <div key={option.option_id}>
                                    <input
                                        type="radio"
                                        id={option.option_id}
                                        name={`question_${question.question_id}`}
                                        value={option.option_id}
                                        onChange={() => handleOptionSelect(question.question_id, option.option_id)}
                                    />
                                    <label htmlFor={option.option_id}>{option.option_text}</label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button onClick={handleSubmitQuiz}>Submit Quiz</button>
                </>
            ) : (
                <p>Loading...</p>
            )}
            {score !== null && <p>Your score: {score}</p>}
        </div>
    );
}

export default App;
