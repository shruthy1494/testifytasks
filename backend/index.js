import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

let todos = [];
let nextId = 1;

// POST /login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  if (username === 'testuser' && password === 'test123') {
    return res.json({ token: 'abc123' });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
});

// GET /todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST /todos
app.post('/todos', (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
  }

  const newTodo = { id: nextId++, title: title.trim() };
  todos.push(newTodo);

  return res.status(201).json(newTodo);
});

// PUT /todos/:id
app.put('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const { title } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
  }

  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todo.title = title.trim();

  return res.json(todo);
});

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos.splice(index, 1);

  return res.status(204).send();
});

export default app;
