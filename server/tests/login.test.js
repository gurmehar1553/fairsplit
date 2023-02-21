/* eslint-disable prefer-template */
/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const testToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imphc3RhZ2FyYnJhckBnbWFpbC5jb20iLCJwYXNzd29yZCI6Imphc3RhZ2FyYnJhcm1rczEyMyIsInJlbWVtYmVyTWUiOnRydWUsImlhdCI6MTY3MDE1MDUyMSwiZXhwIjoyNTM0MDY0MTIxfQ.hlclOe-puYIj-2kNFJciIxruWERoPo7a-9-bv5Q79ls';
const testTokenExpired = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imphc3RhZ2FyYnJhckBnbWFpbC5jb20iLCJwYXNzd29yZCI6Imphc3RhZ2FyYnJhcm1rczEyMyIsInJlbWVtYmVyTWUiOmZhbHNlLCJpYXQiOjE2NzExNzY4NzUsImV4cCI6MTY3MTE3NjkzNX0.DqPYTcg85AEmXtrjTn6ymvpfSYdQWEP7saXafgdW3FI';

describe('Testing Authorization middleware and login', () => {
  const routerAddress = '/login';
  test('get request with good token', async () => {
    const { body } = await api.get(`${routerAddress}/`).set('Authorization', testToken);
    expect(body.authStatus).toEqual(true);
  });
  test('get request with Null token', async () => {
    const { body } = await api.get(`${routerAddress}/`).set('Authorization', null);
    expect(body.authStatus).toEqual(false);
  });
  test('get request with Expired token', async () => {
    const { body } = await api.get(`${routerAddress}/`).set('Authorization', testTokenExpired);
    expect(body.authStatus).toEqual(false);
    expect(body.err).toEqual('jwt expired');
  });
  test('get request with bad token', async () => {
    const data = await api.get(`${routerAddress}/`).set('Authorization', testToken + 'Invalid');
    const expectData = {
      authStatus: false,
      user: null,
      err: 'invalid signature',
    };
    expect(data.body).toEqual(expectData);
  });

  test('Posting Login Valid', async () => {
    const dataToSend = {
      email: 'jastagarbrar@gmail.com',
      password: 'jastagarbrarmks123',
      rememberMe: true,
    };
    const { body } = await api.post('/login/').send(dataToSend);
    expect(body.status).toBe(true);
    expect(body.message).toBe('Logging in');
    expect(body.token).toBeDefined();
    expect(body.user).toBeDefined();
  });
  test('Posting Login Invalid User', async () => {
    const dataToSend = {
      email: 'jastagarbrar123@gmail.com',
      password: 'jastagarbrarmks123',
      rememberMe: true,
    };
    const { body } = await api.post('/login/').send(dataToSend);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual('This account does not exist...');
  });
  test('Posting Login Invalid Password', async () => {
    const dataToSend = {
      email: 'jastagarbrar@gmail.com',
      password: 'wrongPassword',
      rememberMe: true,
    };
    const { body } = await api.post('/login/').send(dataToSend);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual('Wrong Password');
  });
}, 100000);
