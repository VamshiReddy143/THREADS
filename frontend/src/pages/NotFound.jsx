import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.errorCode}>404</h1>
            <h2 style={styles.title}>Oops! Page Not Found</h2>
            <p style={styles.message}>
                The page you are looking for might have been removed or temporarily unavailable.
            </p>
            <Link to="/home" style={styles.homeButton}>
                Go Back Home
            </Link>
           

        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        color: '#343a40',
        fontFamily: 'Arial, sans-serif',
    },
    errorCode: {
        fontSize: '8rem',
        fontWeight: 'bold',
        margin: '0',
    },
    title: {
        fontSize: '2rem',
        margin: '0.5rem 0',
    },
    message: {
        fontSize: '1.2rem',
        marginBottom: '2rem',
    },
    homeButton: {
        textDecoration: 'none',
        padding: '0.8rem 1.5rem',
        backgroundColor: '#007bff',
        color: 'white',
        borderRadius: '5px',
        fontSize: '1rem',
        fontWeight: 'bold',
    },
};

export default NotFound;
