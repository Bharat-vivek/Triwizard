import React from 'react';
import { Link } from 'react-router-dom';

const NGODashboard = () => {
    return (
        <div className="student-dashboard">
            <h1>Welcome to Your Dashboard</h1>
            {/* Other dashboard content */}
            <Link to="/mentor-student-mapping" className="btn btn-info">Manage Mentor-Student Mappings</Link>
        </div>
    );
};

export default NGODashboard;
