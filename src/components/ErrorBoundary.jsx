import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service here
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Fallback UI
            return (
                <div className="page-container error-boundary-container">
                    <h2>Oops! Something went wrong.</h2>
                    <p>{this.state.error?.message || "An unexpected error occurred while rendering this module."}</p>
                    <button onClick={() => window.location.href = '/'} className="submit-btn" style={{ width: 'auto', marginTop: '2rem' }}>
                        Return to Home
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
