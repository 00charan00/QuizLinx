import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbarr = () => {
    return (
        <nav className="bg-gray-800 flex justify-between items-center p-2">
            <div className="flex items-center">
                <img className="h-10 w-10" src={logo} alt="Logo"/>
                <Link to="/home" className="text-white text-lg font-bold ml-2">QuizLinx</Link>
            </div>
            <ul className="flex space-x-4">
                <li>
                    <Link to="/home" className="text-white hover:text-gray-300">Home</Link>
                </li>
                <li>
                    <Link to="/" className="text-white hover:text-gray-300">Create Quiz</Link>
                </li>
                <li>
                    <Link to="/" className="text-white hover:text-gray-300">Attend Quiz</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbarr;
