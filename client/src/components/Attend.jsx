import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import quizimg1 from '../assets/quiz.png';

function Attend({ onSelectQuiz }) {
    const [quizzes, setQuizzes] = useState([]);




    useEffect(() => {
        axios.get('https://quizlinx.onrender.com/quizzes')
            .then(res => {
                setQuizzes(res.data);
            })
            .catch(error => {
                console.error('Error fetching quizzes:', error);
            });
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container mx-auto py-8">
                <div className="flex flex-wrap justify-center gap-5">
                    {quizzes.map(quiz => (
                        <div key={quiz.quizid} className="card w-96 bg-base-100 shadow-xl hover:bg-gray-400 relative overflow-hidden">
                            <div className="absolute top-10 right-0 w-40 h-40 bg-cover bg-no-repeat" style={{ backgroundImage: `url(${quizimg1})` }}>
                            </div>
                            <div className="card-body relative z-10">
                                <h2 className="card-title">{quiz.quizname}</h2>
                                <div className="card-actions justify-end ">
                                    <div >
                                    <button className="btn btn-primary " onClick={() => onSelectQuiz(quiz.quizid)}>
                                        Attend
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Attend;
