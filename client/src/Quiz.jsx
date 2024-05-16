import React, { useState } from 'react';
import axios from 'axios';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const QuizForm = () => {
    const [quizName, setQuizName] = useState('');
    const [questions, setQuestions] = useState([]);

    const addQuestion = () => {
        setQuestions(prevQuestions => [...prevQuestions, { question: '', options: ['', '', '', ''], correctOption: 1 }]);
    };

    const handleQuestionChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].question = value;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (index, optionIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].options[optionIndex] = value;
        setQuestions(updatedQuestions);
    };

    const handleCorrectOptionChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].correctOption = parseInt(value); // Convert value to integer
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:8080/quiz', { quizName, questions });
            alert("Quiz Created Successfully");
            window.location.reload();
            // Clear form or navigate to another page
        } catch (error) {
            console.error('Error creating quiz:', error);
        }
    };

    return (
        <div>
            <Navbar/>
        <div className="max-w-lg mx-auto mt-8 mb-96">
            <input
                type="text"
                value={quizName}
                onChange={e => setQuizName(e.target.value)}
                placeholder="Quiz Name"
                className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
            />
            {questions.map((question, index) => (
                <div key={index} className="mb-4">
                    <input
                        type="text"
                        value={question.question}
                        onChange={e => handleQuestionChange(index, e.target.value)}
                        placeholder="Question"
                        className="border border-gray-300 rounded px-4 py-2 mb-2 w-full"
                    />
                    {question.options.map((option, optionIndex) => (
                        <input
                            key={optionIndex}
                            type="text"
                            value={option}
                            onChange={e => handleOptionChange(index, optionIndex, e.target.value)}
                            placeholder={`Option ${optionIndex + 1}`}
                            className="border border-gray-300 rounded px-4 py-2 mb-2 w-full"
                        />
                    ))}
                    <select
                        value={question.correctOption}
                        onChange={e => handleCorrectOptionChange(index, e.target.value)}
                        className="border border-gray-300 rounded px-4 py-2 mb-2 w-full"
                    >
                        {question.options.map((_, optionIndex) => (
                            <option key={optionIndex} value={optionIndex + 1}>{optionIndex + 1}</option>
                        ))}
                    </select>
                </div>
            ))}
            <button
                onClick={addQuestion}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
                Add Question
            </button>
            <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded"
            >
                Submit Quiz
            </button>
        </div>
            <Footer/>
        </div>
    );
};

export default QuizForm;
