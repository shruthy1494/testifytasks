import React, { useEffect, useState } from 'react';

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
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  inputRow: {
    display: 'flex',
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flexGrow: 1,
    padding: 8,
    fontSize: 16,
    borderRadius: 4,
    border: '1px solid #ccc',
  },
  button: {
    padding: '8px 16px',
    fontSize: 16,
    cursor: 'pointer',
    borderRadius: 4,
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    transition: 'background-color 0.3s ease',
  },
  smallButton: {
    padding: '6px 12px',
    fontSize: 14,
    borderRadius: 4,
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
  },
  editButton: {
    backgroundColor: '#007bff',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: '#28a745',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
  },
  todoList: {
    listStyle: 'none',
    paddingLeft: 0,
  },
  todoItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #eee',
  },
  todoTitle: {
    flexGrow: 1,
    marginRight: 10,
    fontSize: 16,
  },
  editForm: {
    display: 'flex',
    gap: 10,
    flexGrow: 1,
  },
  editInput: {
    flexGrow: 1,
    padding: 8,
    fontSize: 16,
    borderRadius: 4,
    border: '1px solid #ccc',
  },
};

export default function TodoList({ backendUrl }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const res = await fetch(`${backendUrl}/todos`);
        if (!res.ok) throw new Error('Failed to fetch todos');
        const data = await res.json();
        setTodos(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchTodos();
  }, [backendUrl]);

  async function addTodo() {
    if (!newTodo.trim()) return;
    try {
      const res = await fetch(`${backendUrl}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTodo.trim() }),
      });
      if (!res.ok) throw new Error('Failed to add todo');
      const added = await res.json();
      setTodos(prev => [...prev, added]);
      setNewTodo('');
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteTodo(id) {
    try {
      const res = await fetch(`${backendUrl}/todos/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete todo');
      setTodos(prev => prev.filter(t => t.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }

  async function updateTodo(id) {
    if (!editedTitle.trim()) return;
    try {
      const res = await fetch(`${backendUrl}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editedTitle.trim() }),
      });
      if (!res.ok) throw new Error('Failed to update todo');
      const updated = await res.json();
      setTodos(prev => prev.map(t => (t.id === id ? updated : t)));
      setEditingId(null);
      setEditedTitle('');
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Todo List</h2>
      {error && (
        <p role="alert" style={styles.error}>
          {error}
        </p>
      )}
      <div style={styles.inputRow}>
        <input
          aria-label="New todo"
          placeholder="New todo"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          data-testid="new-todo-input"
          style={styles.input}
        />
        <button
          onClick={addTodo}
          aria-label="Add todo"
          data-testid="add-todo-button"
          style={styles.button}
          type="button"
        >
          Add
        </button>
      </div>
      <ul style={styles.todoList}>
        {todos.map(todo => (
          <li key={todo.id} data-testid={`todo-${todo.id}`} style={styles.todoItem}>
            {editingId === todo.id ? (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateTodo(todo.id);
                }}
                style={styles.editForm}
              >
                <input
                  aria-label={`Edit todo ${todo.id}`}
                  placeholder="Edit todo"
                  value={editedTitle}
                  onChange={e => setEditedTitle(e.target.value)}
                  data-testid={`edit-input-${todo.id}`}
                  style={styles.editInput}
                />
                <button
                  type="submit"
                  data-testid={`save-button-${todo.id}`}
                  style={{ ...styles.smallButton, ...styles.saveButton }}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setEditedTitle('');
                  }}
                  data-testid={`cancel-button-${todo.id}`}
                  style={{ ...styles.smallButton, ...styles.cancelButton }}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <span style={styles.todoTitle}>{todo.title}</span>
                <button
                  onClick={() => {
                    setEditingId(todo.id);
                    setEditedTitle(todo.title);
                  }}
                  aria-label={`Edit todo ${todo.id}`}
                  data-testid={`edit-button-${todo.id}`}
                  style={{ ...styles.smallButton, ...styles.editButton }}
                  type="button"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  aria-label={`Delete todo ${todo.id}`}
                  data-testid={`delete-button-${todo.id}`}
                  style={{ ...styles.smallButton, ...styles.deleteButton }}
                  type="button"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
