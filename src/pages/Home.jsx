import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
        setStudents(storedStudents);
    }, []);

    const handleDelete = (id) => {
        const updatedStudents = students.filter(student => student.id !== id);
        setStudents(updatedStudents);
        localStorage.setItem('students', JSON.stringify(updatedStudents));
    };

    const handleClearAll = () => {
        if (window.confirm("Are you sure you want to delete all students? This cannot be undone.")) {
            setStudents([]);
            localStorage.removeItem('students');
        }
    };

    return (
        <div className="page-container">
            <h1>Student Portal</h1>
            <div className="info-card">
                {students.length === 0 ? (
                    <p>No students added yet.</p>
                ) : (
                    <div>
                        <p>Total number of students: <strong>{students.length}</strong></p>
                        <button className="submit-btn" style={{ marginTop: '2rem', maxWidth: '200px', backgroundColor: 'var(--error-color)', background: 'var(--error-color)' }} onClick={handleClearAll}>
                            Clear All Data
                        </button>
                    </div>
                )}
            </div>

            {students.length > 0 && (
                <div className="local-students-list">
                    <h2 style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--text-color)' }}>
                        Added Students
                    </h2>
                    <div className="user-grid">
                        {students.map(student => (
                            <div key={student.id} className="user-card">
                                <h3>{student.name}</h3>
                                <p><strong>Email:</strong> {student.email}</p>
                                <p><strong>Phone:</strong> {student.phone}</p>
                                <p><strong>Gender:</strong> {student.gender}</p>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <Link to={`/edit/${student.id}`} className="btn increment" style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }}>
                                        Edit
                                    </Link>
                                    <button className="btn decrement" style={{ flex: 1 }} onClick={() => handleDelete(student.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
