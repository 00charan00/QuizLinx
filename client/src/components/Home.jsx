import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../Style/App.css';


function Home() {
    return (
        <div className="bg-colour1 h-screen">
            <Navbar />
            <div>
                <div className="flex mx-20 my-16 h-96 gap-5">
                    <div className="bg-colour2 text-white text-left rounded-2xl h-full mb-10 mr-5 w-screen">
                        <h2 className="p-10 font-sans text-5xl font-bold text-red-300">
                            Create Quiz
                        </h2>
                        <div className="flex mx-10">
                            <div className="">
                                <div className="card w-60 bg-colour3 text-primary-content">
                                    <div className="card-body">
                                        <h2 className="card-title text-colour2">Card title!</h2>
                                        <p className="text-black">If a dog chews shoes whose shoes does he choose?</p>
                                    </div>
                                </div>
                            </div>
                            <div className="pl-5">
                                <div className="card w-60 bg-colour3 text-primary-content">
                                    <div className="card-body">
                                        <h2 className="card-title text-colour2">Card title!</h2>
                                        <p className="text-black">If a dog chews shoes whose shoes does he choose?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-colour2 text-white text-left rounded-2xl h-full mb-10 mr-5 w-screen">
                        <h2 className="p-10 font-sans text-5xl font-bold text-blue-300">
                            Participate
                        </h2>
                        <div className="flex mx-10">
                            <div className="">
                                <div className="card w-60 bg-colour3 text-primary-content">
                                    <div className="card-body">
                                        <h2 className="card-title text-colour2">Card title!</h2>
                                        <p className="text-black">If a dog chews shoes whose shoes does he choose?</p>
                                    </div>
                                </div>
                            </div>
                            <div className="pl-5">
                                <div className="card w-60 bg-colour3 text-primary-content">
                                    <div className="card-body">
                                        <h2 className="card-title text-colour2">Card title!</h2>
                                        <p className="text-black">If a dog chews shoes whose shoes does he choose?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;