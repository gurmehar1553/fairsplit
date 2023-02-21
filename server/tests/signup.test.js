/* eslint-disable prefer-template */
/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const OTP = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imphc3RhZ2FyYnJhckBnbWFpbC5jb20iLCJwYXNzd29yZCI6Imphc3RhZ2FyYnJhcm1rczEyMyIsInJlbWVtYmVyTWUiOmZhbHNlLCJpYXQiOjE2NzExNzY4NzUsImV4cCI6MTY3MTE3NjkzNX0.DqPYTcg85AEmXtrjTn6ymvpfSYdQWEP7saXafgdW3FI';

const postObject = {
  username: 'Test User 1',
  email: 'testusertestemail@gmail.com',
  otp: OTP,
  password: 'testpass123',
};

describe('Testing the sign up Functionality', () => {
  const routerAddress = '/signup';
  test('Creating new  valid User', async () => {
    const response = await api.post(routerAddress, postObject);
    expect(response.body.status).toBe(true);
  });

  test('Creating new Invalid User', async () => {
    const response = await api.post(routerAddress, postObject);
    expect(response.body.status).toBe(false);
  });

  test('Creating new  valid User', async () => {
    const response = await api.post(routerAddress, postObject);
    expect(response.body.status).toBe(false);
  });

  test('Creating new  valid User', async () => {
    const response = await api.post(routerAddress, postObject);
    expect(response.body.status).toBe(false);
  });
});
