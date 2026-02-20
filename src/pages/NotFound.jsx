import React from 'react';

const NotFound = () => {
    return (
        <div className="error-boundary-container" style={{ marginTop: '5rem' }}>
            <h1 style={{ fontSize: '6rem', color: 'var(--primary-color)', margin: '0 0 1rem 0' }}>404</h1>
            <h2>Page Not Found</h2>
            <p style={{ marginTop: '1rem' }}>The page you are looking for doesn't exist or has been moved.</p>
            <div style={{ marginTop: '2.5rem' }}>
                <a href="/" className="submit-btn" style={{ display: 'inline-block', textDecoration: 'none', width: 'auto' }}>
                    Take Me Back Home
                </a>
            </div>
        </div>
    );
};

export default NotFound;
