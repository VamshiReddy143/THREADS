import React, { useState, useEffect } from 'react';

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>You're Offline</h2>
        <p style={styles.message}>
          Please check your internet connection and try again.
        </p>
      </div>
    );
  }

  return null; // Don't show anything if the user is online
};

const styles = {
  container: {
    position: 'fixed',
    top: '0',
    width: '100%',
    backgroundColor: '#ffcccb',
    color: '#333',
    textAlign: 'center',
    padding: '1rem',
    zIndex: 1000,
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '1.5rem',
    margin: '0',
  },
  message: {
    fontSize: '1rem',
    margin: '0.5rem 0 0',
  },
};

export default NetworkStatus;
