import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

const StudentDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('User not found');
                }
                return res.json();
            })
            .then((data) => {
                setUser(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    return (
        <div className="page-container">
            {loading && <Spinner />}
            {error && (
                <div className="error-boundary-container">
                    <h2>User Not Found</h2>
                    <p>{error}</p>
                    <Link to="/students" className="submit-btn" style={{ display: 'inline-block', textDecoration: 'none', width: 'auto', marginTop: '1rem' }}>
                        Back to Directory
                    </Link>
                </div>
            )}

            {!loading && !error && user && (
                <div className="student-details-card">
                    <div className="details-header">
                        <h2>{user.name}</h2>
                        <span className="username">@{user.username}</span>
                    </div>

                    <div className="details-body">
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                        <p><strong>Website:</strong> {user.website}</p>

                        <div className="company-info">
                            <h3>Company</h3>
                            <p><strong>Name:</strong> {user.company.name}</p>
                            <p><em>"{user.company.catchPhrase}"</em></p>
                        </div>

                        <div className="address-info">
                            <h3>Address</h3>
                            <p>{user.address.suite} {user.address.street}</p>
                            <p>{user.address.city}, {user.address.zipcode}</p>
                        </div>
                    </div>

                    <div style={{ marginTop: '2.5rem' }}>
                        <Link to="/students" className="btn reset" style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}>
                            ← Back to Directory
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDetails;
