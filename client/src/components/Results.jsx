import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "./Navbar";
import Footer from "./Footer";

function Results() {
    const [results, setResults] = useState([]);

    useEffect(() => {
        axios.get('https://quizlinx.onrender.com/getresults')
            .then(response => {
                setResults(response.data);
            })
            .catch(error => {
                console.error('Error fetching results:', error);
            });
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
                <div>
                    {results.map(result => (
                        <div key={result.id} className="border p-4 mb-4 rounded shadow">
                            <h3 className="text-lg font-semibold">{result.name}</h3>
                            <p className="text-gray-700">Email: {result.email}</p>
                            <p className="text-gray-700">Score: {result.marks}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Results;