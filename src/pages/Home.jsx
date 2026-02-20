import React, { useState, useEffect } from 'react';

const Home = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
        setStudents(storedStudents);
    }, []);

    return (
        <div className="page-container">
            <h1>Student Portal</h1>
            <div className="info-card">
                {students.length === 0 ? (
                    <p>No students added yet.</p>
                ) : (
                    <p>
                        Total number of students: <strong>{students.length}</strong>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Home;
