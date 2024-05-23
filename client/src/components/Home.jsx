import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../Style/App.css';


function Home() {
    return (
        <div className="bg-colour1 h-screen">
            <Navbar/>
            <div>
                <div className="flex   mx-20 my-16 h-3/4 gap-5">
                    <div
                        className=" text-white text-left rounded-2xl h-full pb-32 mb-20  mr-5  w-screen ">
                        <h2 className="p-10  font-sans text-5xl  font-bold text-red-300">
                            Create Quiz
                        </h2>
                        <div className="flex mx-10">
                            <div className="">
                                <div className="card w-60 bg-colour3 text-primary-content">
                                    <div className="card-body">
                                        <h2 className="card-title text-colour2">Intuitive Interface</h2>
                                        <p className="text-black">Craft quizzes effortlessly with user-friendly
                                            tools.</p>

                                    </div>
                                </div>
                            </div>
                            <div className="pl-5">
                                <div className="card w-60 bg-colour3 text-primary-content">
                                    <div className="card-body">
                                        <h2 className="card-title text-colour2">Create with Ease!</h2>
                                        <p className="text-black">Create quizzes of any size with upto four options
                                            each</p>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div
                        className=" bg-base-100 drop-shadow-xl hover:drop-shadow-lg text-white text-left rounded-2xl h-full pb-32 mb-20  mr-5  w-screen ">
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
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;
