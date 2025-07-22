import React, { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './MentorStudentMapping.css'; // Optional: For styling

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const MentorStudentMapping = () => {
    const [mappings, setMappings] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [students, setStudents] = useState([]);
    const [mentorId, setMentorId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [editMapping, setEditMapping] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        fetchMappings();
        fetchMentors();
        fetchStudents();
    }, []);

    const fetchMappings = async () => {
        setMappings([
            { id: 1, mentorId: 'M1', studentId: 'S1' },
            { id: 2, mentorId: 'M2', studentId: 'S2' },
        ]);
    };

    const fetchMentors = async () => {
        setMentors([
            { mentorId: 'M1', name: 'John Doe', company: 'Tech Corp', phone: '123-456-7890', email: 'john@example.com' },
            { mentorId: 'M2', name: 'Jane Smith', company: 'Innovate Inc', phone: '987-654-3210', email: 'jane@example.com' },
        ]);
    };

    const fetchStudents = async () => {
        setStudents([
            { studentId: 'S1', name: 'Alice Brown', gradeData: [90, 85, 95, 80], attendanceData: [28, 12] },
            { studentId: 'S2', name: 'Bob White', gradeData: [80, 75, 85, 90], attendanceData: [25, 15] },
        ]);
    };

    const getNextId = () => {
        return mappings.length > 0 ? Math.max(...mappings.map(mapping => mapping.id)) + 1 : 1;
    };

    const handleCreate = async () => {
        const newMapping = { mentorId, studentId, id: getNextId() };
        setMappings([...mappings, newMapping]);
        setMentorId('');
        setStudentId('');
    };

    const handleUpdate = async () => {
        if (editMapping) {
            const updatedMapping = { ...editMapping, mentorId, studentId };
            setMappings(mappings.map(mapping => (mapping.id === editMapping.id ? updatedMapping : mapping)));
            setEditMapping(null);
            setMentorId('');
            setStudentId('');
        }
    };

    const handleDelete = async (id) => {
        setMappings(mappings.filter(mapping => mapping.id !== id));
    };

    const handleEdit = (mapping) => {
        setMentorId(mapping.mentorId);
        setStudentId(mapping.studentId);
        setEditMapping(mapping);
    };

    const handleSelectStudent = (studentId) => {
        const student = students.find(s => s.studentId === studentId);
        setSelectedStudent(student);
    };

    const downloadPDF = () => {
        const input = document.getElementById('report');
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height],
            });
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save('report.pdf');
        });
    };

    const lineChartData = selectedStudent ? {
        labels: ['Test1', 'Test2', 'Test3', 'Test4'],
        datasets: [
            {
                label: 'Scores',
                data: selectedStudent.gradeData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    } : {};

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

    const pieChartData = selectedStudent ? {
        labels: ['Present', 'Absent'],
        datasets: [
            {
                label: 'Attendance',
                data: selectedStudent.attendanceData,
                backgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                hoverBackgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 99, 132, 0.8)'],
            },
        ],
    } : {};

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

    return (
        <div className="mentor-student-mapping">
            <h2>Mentor-Student Mapping</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    editMapping ? handleUpdate() : handleCreate();
                }}
            >
                <div>
                    <label>Mentor ID:</label>
                    <input
                        type="text"
                        value={mentorId}
                        onChange={(e) => setMentorId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Student ID:</label>
                    <input
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {editMapping ? 'Update Mapping' : 'Create Mapping'}
                </button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Mentor ID</th>
                        <th>Student ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mappings.map(mapping => (
                        <tr key={mapping.id}>
                            <td>{mapping.id}</td>
                            <td>{mapping.mentorId}</td>
                            <td>{mapping.studentId}</td>
                            <td>
                                <button
                                    onClick={() => handleEdit(mapping)}
                                    className="btn btn-warning"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(mapping.id)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="student-details-section">
                <h3>Student Details</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.studentId}>
                                <td>{student.studentId}</td>
                                <td>{student.name}</td>
                                <td>
                                    <button
                                        onClick={() => handleSelectStudent(student.studentId)}
                                        className="btn btn-info"
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedStudent && (
                <div className="student-details" id="report">
                    <h3>Selected Student: {selectedStudent.name}</h3>
                    <div className="chart-container">
                        <div className="chart">
                            <h4>Subject Scores</h4>
                            <Line data={lineChartData} options={lineChartOptions} />
                        </div>

                        <div className="pie-chart">
                            <h4>Attendance</h4>
                            <Pie data={pieChartData} options={pieChartOptions} />
                            <div className="attendance-details">
                                <p>Present: {selectedStudent.attendanceData[0]}</p>
                                <p>Absent: {selectedStudent.attendanceData[1]}</p>
                                <p>Total Classes: {selectedStudent.attendanceData[0] + selectedStudent.attendanceData[1]}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <button onClick={downloadPDF} className="btn btn-download">
                Download PDF
            </button>
        
            <div className="mentor-details-section">
                <h3>Mentor Details</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Mentor ID</th>
                            <th>Name</th>
                            <th>Company</th>
                            <th>Phone No.</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mentors.map(mentor => (
                            <tr key={mentor.mentorId}>
                                <td>{mentor.mentorId}</td>
                                <td>{mentor.name}</td>
                                <td>{mentor.company}</td>
                                <td>{mentor.phone}</td>
                                <td>{mentor.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MentorStudentMapping;
