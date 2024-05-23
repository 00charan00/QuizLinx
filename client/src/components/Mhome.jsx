import React from 'react';
import Navbar from './Navbar';
import '../Style/App.css';
import Footer from "./Footer";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Home() {
    const navigate = useNavigate();
    return (
        <div className="h-screen">
            <Navbar/>
            <div>
                <div className="flex   mx-20 my-16 h-3/4 gap-5">
                    <div
                        className=" bg-base-100  text-white text-left rounded-2xl h-full mb-10  mr-5  w-screen ">
                        <h2 className="p-10  font-sans text-5xl  font-bold text-red-300">
                            Create Quiz
                        </h2>
                        <div className="flex mx-10">
                            <div className="">
                                <div className="card w-60 bg-colour3 text-primary-content">
                                    <div className="card-body">
                                        <h2 className="card-title text-colour2">Intuitive Interface</h2>
                                        <p className="text-black">Craft quizzes effortlessly with user-friendly tools.</p>

                                    </div>
                                </div>
                            </div>
                            <div className="pl-5">
                                <div className="card w-60 bg-colour3 text-primary-content">
                                    <div className="card-body">
                                        <h2 className="card-title text-colour2">Create with Ease</h2>
                                        <p className="text-black">Create quizzes of any size with upto four options each</p>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="mt-32 mb-4 ml-12 ">
                            <button onClick={() => {
                                navigate('/home/quiz')
                            }}
                                    className="text-colour4 font-bold bg-colour3 border-2 rounded-full w-44 h-10 hover:scale-105">Create
                            </button>
                        </div>

                    </div>
                    <div
                        className="bg-base-100 drop-shadow-md hover:drop-shadow-xl text-white text-left rounded-2xl h-full mb-10  mr-5  w-screen ">
                        <h2 className="p-10  font-sans text-5xl  font-bold text-blue-300">
                            Participate
                        </h2>
                        <div className="flex mx-10">
                            <div className="">
                                <div className="card w-60 bg-colour3 text-primary-content">
                                    <div className="card-body">
                                        <h2 className="card-title text-colour2">Diverse Quiz Selection</h2>
                                        <p className="text-black">Explore quizzes covering various topics.</p>

                                    </div>
                                </div>
                            </div>
                            <div className="pl-5">
                                <div className="card w-60 bg-colour3 text-primary-content">
                                    <div className="card-body">
                                        <h2 className="card-title text-colour2">Competitive Challenges</h2>
                                        <p className="text-black">Engage in timed quizzes and competitive modes.</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-32 mb-4 ml-12 ">
                            <button onClick={() => {
                                navigate('/home/quizit')
                            }}
                                    className="text-colour4 font-bold bg-colour3 border-2 rounded-full w-44 h-10 hover:scale-105">Participate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;