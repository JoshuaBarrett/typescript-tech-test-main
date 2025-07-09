import request from 'supertest';
import app from '../app';
import { initTestDb } from '../services/db/db';

beforeAll(async () => {
  await initTestDb();
});

describe('POST /users/signup', () => {
  it('returns 201 and new user id when user data is valid', async() => {
    const res = await request(app).post('/users/signup')
      .send({
        fullName: 'Test User',
        password: 'Password1!',
        emailAddress: 'test@email.com',
        createdDate: '2025-07-08',
        userType: 'student'
      });
    expect(res.status).toBe(201);
    expect(res.body.id).toBe(4);
  });


});