import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import TodoList from './pages/TodoList';

export default function App() {
  const navigate = useNavigate();
  const backendUrl = 'http://localhost:3001';

  async function handleLogin(username, password) {
    try {
      const res = await fetch(`${backendUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        console.error('Login failed:', res.status);
        throw new Error('Login failed');
      }

      console.log('Login successful');
      navigate('/todos');
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={handleLogin} />} />
      <Route path="/todos" element={<TodoList backendUrl={backendUrl} />} />
    </Routes>
  );
}
