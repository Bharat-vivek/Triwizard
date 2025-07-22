import React from 'react';
import { Link } from 'react-router-dom';


const InstructionPage = () => {
    return (
        <div className="test">
            <h1>Instructions</h1>
            <p>Welcome to the test! Please read the instructions below:</p>
            <ul>
                <li>Each question has multiple choices.</li>
                <li>For each correct answer, you will receive 3 points.</li>
                <li>For each wrong answer, you will lose 1 point.</li>
                <li>Try to answer all questions to get the best score!</li>
            </ul>
            <Link to="/Test">
                <button className="btn btn-primary">Start Test</button>
            </Link>
        </div>
    );
};

export default InstructionPage;
