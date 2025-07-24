import React, { useState } from 'react';

const styles = {
  container: {
    padding: 20,
    maxWidth: 400,
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: 20,
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    fontSize: 16,
    borderRadius: 4,
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 12px',
    fontSize: 16,
    cursor: 'pointer',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: 4,
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
};

export default function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await onLogin(credentials.username, credentials.password);
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit} noValidate style={styles.formGroup}>
        <input
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          required
          autoComplete="username"
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
      {error && <p role="alert" style={styles.error}>{error}</p>}
    </div>
  );
}
