import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Students = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetching API users
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                return res.json();
            })
            .then((data) => {
                // Technically required strictly the first 6 users!
                setUsers(data.slice(0, 6));
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="page-container">
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Student Directory (API)</h2>

            {loading && <Spinner />}
            {error && <p className="error">{error}</p>}

            {!loading && !error && (
                <div className="user-grid">
                    {users.map((user) => (
                        <Link to={`/students/${user.id}`} key={user.id} className="user-card link-card">
                            <h3>{user.name}</h3>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone:</strong> {user.phone}</p>
                            <span className="view-details-text">View Details →</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Students;
