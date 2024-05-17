import React, { useState } from 'react';
import Attend from './Attend';
import AttendQuiz from './AttendQuiz';

function App() {
    const [selectedQuizId, setSelectedQuizId] = useState(null);

    const handleSelectQuiz = (quizId) => {
        setSelectedQuizId(quizId);
    };

    return (
        <div className="App">
            <h1>Quiz App</h1>
            {!selectedQuizId && <Attend onSelectQuiz={handleSelectQuiz} />}
            {selectedQuizId && <AttendQuiz quizId={selectedQuizId} />}
        </div>
    );
}

export default App;
