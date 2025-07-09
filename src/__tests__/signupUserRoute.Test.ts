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

  it('returns 400 when password is too short', async() => {
    const res = await request(app).post('/users/signup')
      .send({
        fullName: 'Test User',
        password: 'Pass1',
        emailAddress: 'test@email.com',
        createdDate: '2025-07-08',
        userType: 'student'
      });
    expect(res.status).toBe(400);
    expect(res.body.details).toContain('Password must be at least 8 characters');
  });

  it('returns 400 when password is too long', async() => {
    const res = await request(app).post('/users/signup')
      .send({
        fullName: 'Test User',
        password: 'Pass1Pass1Pass1Pass1Pass1Pass1Pass1Pass1Pass1Pass1Pass1Pass1Pass1',
        emailAddress: 'test@email.com',
        createdDate: '2025-07-08',
        userType: 'student'
      });
    expect(res.status).toBe(400);
    expect(res.body.details).toContain('Password must be at most 64 characters');
  });

  it('returns 400 when password has no numbers', async() => {
    const res = await request(app).post('/users/signup')
      .send({
        fullName: 'Test User',
        password: 'Password',
        emailAddress: 'test@email.com',
        createdDate: '2025-07-08',
        userType: 'student'
      });
    expect(res.status).toBe(400);
    expect(res.body.details).toContain('Password must contain at least one number');
  });

  it('returns 400 when password has no lowercase characters', async() => {
    const res = await request(app).post('/users/signup')
      .send({
        fullName: 'Test User',
        password: 'PASSWORD1',
        emailAddress: 'test@email.com',
        createdDate: '2025-07-08',
        userType: 'student'
      });
    expect(res.status).toBe(400);
    expect(res.body.details).toContain('Password must contain at least one lowercase letter');
  });

  it('returns 400 when password has no uppercase characters', async() => {
    const res = await request(app).post('/users/signup')
      .send({
        fullName: 'Test User',
        password: 'password1',
        emailAddress: 'test@email.com',
        createdDate: '2025-07-08',
        userType: 'student'
      });
    expect(res.status).toBe(400);
    expect(res.body.details).toContain('Password must contain at least one uppercase letter');
  });

  it('returns 400 when password is too short and has no numbers or uppercase characters', async() => {
    const res = await request(app).post('/users/signup')
      .send({
        fullName: 'Test User',
        password: 'pass',
        emailAddress: 'test@email.com',
        createdDate: '2025-07-08',
        userType: 'student'
      });
    expect(res.status).toBe(400);
    expect(res.body.details).toContain('Password must contain at least one uppercase letter');
    expect(res.body.details).toContain('Password must contain at least one number');
    expect(res.body.details).toContain('Password must be at least 8 characters');
  });

  it('returns 400 when email is invalid', async() => {
    const res = await request(app).post('/users/signup')
      .send({
        fullName: 'Test User',
        password: 'Password1',
        emailAddress: 'testemail',
        createdDate: '2025-07-08',
        userType: 'student'
      });

    expect(res.status).toBe(400);
    expect(res.body.details).toContain('Email address is invalid');
  });

  it('returns 400 when fullname is missing', async() => {
    const res = await request(app).post('/users/signup')
      .send({
        fullName: '',
        password: 'Password1',
        emailAddress: 'testemail',
        createdDate: '2025-07-08',
        userType: 'student'
      });

    expect(res.status).toBe(400);
    expect(res.body.details).toContain('Full name is required');
  });

  it('returns 400 when created date is in the future', async() => {
    const res = await request(app).post('/users/signup')
      .send({
        fullName: 'Test User',
        password: 'Password1',
        emailAddress: 'test@email.com',
        createdDate: '2099-01-01',
        userType: 'student'
      });

    expect(res.status).toBe(400);
    expect(res.body.details).toContain('Created date cannot be in the future');
  });

  it('returns 400 when User Type is invalid', async() => {
    const res = await request(app).post('/users/signup')
      .send({
        fullName: 'Test User',
        password: 'Password1',
        emailAddress: 'test@email.com',
        createdDate: '2025-07-08',
        userType: 'bossman'
      });

    expect(res.status).toBe(400);
    expect(res.body.details).toContain('User Type must be one of: student, teacher, parent, privatetutor');
  });
});