import React from 'react';

const GlobalLoader = () => {
    return (
        <div style={styles.overlay}>
            <div className="spinner">
                Loading...
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // Ensure it sits on top of everything
    },
};

export default GlobalLoader;
