import React from 'react';

const RegisterPopup = ({ onClose }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h3 style={{ marginBottom: '1rem' }}>OTP Sent</h3>
        <p style={{ fontSize: '14px', marginBottom: '1.5rem' }}>
          An OTP has been sent to your mobile number.
        </p>
        <button style={styles.okButton} onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  popup: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    width: '300px',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
  },
  okButton: {
    padding: '0.5rem 1.5rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#003DA5',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer'
  }
};

export default RegisterPopup;
