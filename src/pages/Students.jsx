import React, { useState, useEffect } from 'react';

const Students = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                return res.json();
            })
            .then((data) => {
                setUsers(data.slice(0, 6)); // Display only first 6 users
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="page-container">
            <h2>Student Directory (API)</h2>
            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && (
                <div className="user-grid">
                    {users.map((user) => (
                        <div key={user.id} className="user-card">
                            <h3>{user.name}</h3>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone:</strong> {user.phone}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Students;
