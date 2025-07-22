import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Button } from '@chakra-ui/react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const StudentDashboard = () => {
    const navigate = useNavigate();
    const totalClasses = 40; // Example total classes till date
    const attendedClasses = 35; // Example attended classes
    const absentClasses = totalClasses - attendedClasses;

    const [numRows, setNumRows] = useState(5); // State to track the number of rows to display

    // Example data for the table and chart
    const grades = [
        { subject: 'Test1', grade: 'A', score: 90 },
        { subject: 'Test2', grade: 'B', score: 85 },
        { subject: 'Test3', grade: 'A+', score: 95 },
        { subject: 'Test4', grade: 'B-', score: 80 },
        { subject: 'Test5', grade: 'C+', score: 70 },
        { subject: 'Test6', grade: 'A-', score: 88 },
        { subject: 'Test7', grade: 'B+', score: 84 },
        { subject: 'Test8', grade: 'A', score: 92 }
    ];

    const filteredGrades = grades.slice(0, numRows);

    const lineChartData = {
        labels: filteredGrades.map(grade => grade.subject),
        datasets: [
            {
                label: 'Score',
                data: filteredGrades.map(grade => grade.score),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const lineChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Subject Scores',
            },
        },
    };

    const pieChartData = {
        labels: ['Present', 'Absent'],
        datasets: [
            {
                label: 'Attendance',
                data: [87.5, 12.5], // Example data: 87.5% present, 12.5% absent
                backgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                hoverBackgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 99, 132, 0.8)'],
            },
        ],
    };

    const pieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Attendance',
            },
        },
    };

    const handleFeedback = () => {
        navigate('/feedback'); // Replace '/feedback-form' with your actual feedback form route
    };

    const handleLogout = () => {
        navigate('/');
    };
    const handleQuiz=()=>{
            navigate('/student/quiz');
    };

    return (
        <div className="container-fluid studentdashboard">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">UserName</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <button className="btn btn-outline-success" type="button" onClick={handleLogout}>Logout</button>
                        </form>
                        <Button onClick={handleQuiz}>Live Quizzes</Button>
                    </div>
                </div>
            </nav>

            <div className="container-fluid attendance">
                <h2>Grades</h2>
                <div className="row-filter">
                    <label htmlFor="num-rows">Number of rows to display:</label>
                    <input 
                        type="number" 
                        id="num-rows" 
                        value={numRows} 
                        onChange={(e) => setNumRows(parseInt(e.target.value, 10) || 0)} 
                        min="1"
                    />
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredGrades.map((grade, index) => (
                            <tr key={index}>
                                <td>{grade.subject}</td>
                                <td>{grade.grade}</td>
                            </tr>
                        ))}
                        {grades.length > 0 && numRows > grades.length && (
                            <tr style={{ fontWeight: 'bold' }}>
                                <td>Cumulative</td>
                                <td>B+</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="chart-container">
                <div className="chart">
                    <h2>Test Scores</h2>
                    <Line data={lineChartData} options={lineChartOptions} />
                </div>

                <div className="pie-chart">
                    <h2>Attendance</h2>
                    <Pie data={pieChartData} options={pieChartOptions} />
                    <div className="attendance-details">
                        <p>Total Classes: {totalClasses}</p>
                        <p>Classes Attended: {attendedClasses}</p>
                        <p>Classes Absent: {absentClasses}</p>
                    </div>  
                </div>
            </div>

            <div className='feedback'>
                <p>Submit Feedback</p>
                <button type="button" className="btn btn-success" onClick={handleFeedback}>Submit Feedback</button>
            </div>
        </div>
    );
}

export default StudentDashboard;
