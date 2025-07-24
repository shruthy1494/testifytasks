import request from 'supertest';
import app from '../index.js';

const api = request(app);

describe('API Integration Tests', () => {
  let createdTodoId;

  describe('Auth: POST /login', () => {
    it('logs in successfully with valid credentials', async () => {
      const res = await api.post('/login').send({
        username: 'testuser',
        password: 'test123',
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('fails login with invalid credentials', async () => {
      const res = await api.post('/login').send({
        username: 'wrong',
        password: 'badpass',
      });

      expect(res.statusCode).toBe(401);
      expect(res.body.token).toBeUndefined();
      expect(res.body.error).toMatch(/invalid/i);
    });

    it('fails login with missing credentials', async () => {
      const res = await api.post('/login').send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toMatch(/required/i);
    });
  });

  describe('Todos: GET /todos', () => {
    it('returns an array of todos', async () => {
      const res = await api.get('/todos');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('Todos: POST /todos', () => {
    it('creates a new todo with valid data', async () => {
      const res = await api.post('/todos').send({
        title: 'Test todo from jest',
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('title', 'Test todo from jest');
      expect(res.body).toHaveProperty('id');
      createdTodoId = res.body.id;
    });

    it('fails to create todo with missing title', async () => {
      const res = await api.post('/todos').send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toMatch(/title/i);
    });
  });

  describe('Todos: PUT /todos/:id', () => {
    it('updates an existing todo with new title', async () => {
      const res = await api.put(`/todos/${createdTodoId}`).send({
        title: 'Updated title from jest',
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('title', 'Updated title from jest');
    });

    it('returns 404 when updating a non-existent todo', async () => {
      const res = await api.put('/todos/999999').send({
        title: 'No such todo',
      });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toMatch(/not found/i);
    });

    it('fails to update when title is missing', async () => {
      const res = await api.put(`/todos/${createdTodoId}`).send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toMatch(/title/i);
    });
  });

  describe('Todos: DELETE /todos/:id', () => {
    it('deletes an existing todo', async () => {
      const res = await api.delete(`/todos/${createdTodoId}`);
      expect(res.statusCode).toBe(204);
    });

    it('returns 404 when deleting a non-existent todo', async () => {
      const res = await api.delete('/todos/999999');
      expect(res.statusCode).toBe(404);
      expect(res.body.error).toMatch(/not found/i);
    });
  });
});
