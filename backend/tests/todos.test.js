const request = require('supertest');
const app = require('../index');

describe('Todo API', () => {
  test('GET /health retourne OK', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('OK');
  });

  test('GET /api/todos retourne un tableau', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/todos crée une tâche', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ title: 'Test DevOps' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test DevOps');
  });

  test('POST /api/todos sans titre retourne 400', async () => {
    const res = await request(app).post('/api/todos').send({});
    expect(res.statusCode).toBe(400);
  });
});
