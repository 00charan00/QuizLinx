import React from 'react';
import Navbar from './components/Navbar';
import './App.css';

function Home() {
    return (
        <div className="bg-colour1 h-screen">
            <Navbar />

            <div className="sm:flex h-screen grid sm:mx-20 mx-10 mt-10 sm:h-3/4 gap-5">
                <div className="bg-colour2 text-white text-left rounded-2xl sm:h-full sm:mb-10 sm:mr-0 mr-5 mb-5 sm:w-screen w-10/12">
                    <h2 className="sm:p-10 p-7 font-sans sm:text-5xl text-3xl font-bold text-red-300">
                        Create Quiz
                    </h2>
                    <div className="ml-10 my-4">
                        <div className="sm:mb-6 mb-3">
                            <p className="sm:text-xl text-sm font-medium text-gray-300">Policies Issued</p>
                            <h3 className="sm:text-4xl text-2xl font-sans font-bold">8 Cr.</h3>
                        </div>
                        <div className="sm:mb-6 mb-3">
                            <p className="sm:text-xl text-sm font-medium text-gray-300">1st Year Premium Income</p>
                            <h3 className="sm:text-4xl text-2xl font-sans font-bold">&#8377; 2,13,000 Cr.</h3>
                        </div>
                        <div className="sm:mb-6 mb-3">
                            <p className="sm:text-xl text-sm font-medium text-gray-300">Policies Markt Income</p>
                            <h3 className="sm:text-4xl text-2xl font-sans font-bold">58%</h3>
                        </div>
                        <div className="sm:mb-6 mb-3">
                            <button
                                className="text-colour4 font-bold bg-colour3 border-2 rounded-full w-44 h-10 hover:scale-105">Create
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className="bg-colour2 text-white text-left rounded-2xl sm:h-full sm:mb-10 sm:mr-0 mr-5 mb-5 sm:w-screen w-10/12">
                <h2 className="sm:p-10 p-7 font-sans sm:text-5xl text-3xl font-bold text-blue-300">
                        Participate
                    </h2>

                    <div className="ml-10 my-4">
                        <div className="sm:mb-6 mb-3">
                            <p className="sm:text-xl text-sm font-medium text-gray-300">Policies Issued</p>
                            <h3 className="sm:text-4xl text-2xl font-sans font-bold">8 Cr.</h3>
                        </div>
                        <div className="sm:mb-6 mb-3">
                            <p className="sm:text-xl text-sm font-medium text-gray-300">1st Year Premium Income</p>
                            <h3 className="sm:text-4xl text-2xl font-sans font-bold">&#8377; 2,13,000 Cr.</h3>
                        </div>
                        <div className="sm:mb-6 mb-3">
                            <p className="sm:text-xl text-sm font-medium text-gray-300">Policies Markt Income</p>
                            <h3 className="sm:text-4xl text-2xl font-sans font-bold">58%</h3>
                        </div>
                        <div className="sm:mb-6 mb-3">
                            <button className="text-colour4 font-bold bg-colour3 border-2 rounded-full w-44 h-10 hover:scale-105">Participate</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;