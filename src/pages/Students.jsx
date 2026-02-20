import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Students = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetching all users
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                return res.json();
            })
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="page-container">
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Student Directory (API)</h2>

            {!loading && !error && (
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
            )}

            {loading && <Spinner />}
            {error && <p className="error">{error}</p>}

            {!loading && !error && (
                <div className="user-grid">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <Link to={`/students/${user.id}`} key={user.id} className="user-card link-card">
                                <h3>{user.name}</h3>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Phone:</strong> {user.phone}</p>
                                <span className="view-details-text">View Details →</span>
                            </Link>
                        ))
                    ) : (
                        <p className="no-results" style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '2rem', fontSize: '1.2rem' }}>No students match your search.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Students;
