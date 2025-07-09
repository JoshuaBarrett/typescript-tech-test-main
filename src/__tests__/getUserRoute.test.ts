import request from 'supertest';
import app from '../app';
import { getDb, initTestDb } from '../services/db/db';

beforeAll(() => {
  initTestDb();
});

describe('GET /users/:id', () => {
  it('returns 200 and user data when the user id exists', async() => {
    const res = await request(app).get('/users/1');
    expect(res.status).toBe(200);
    expect(res.body.FullName).toBe('Joshua Barrett');
  });

  it('returns 404 when user id does not exist', async () => {
    const res = await request(app).get('/users/9999');
    expect(res.status).toBe(404);
  });

  it('returns 400 when user id is invalid', async () => {
    const res = await request(app).get('/users/joshua');
    expect(res.status).toBe(400);
  });
});