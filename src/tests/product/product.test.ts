/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect } from 'chai';
import { afterEach, beforeEach } from 'mocha';
import supertest from 'supertest';
import app from '../../../index';
import { firstUserBody } from './mock/user.mock';

let firstUserIdTest = '';
let accessToken = '';
let refreshToken = '';

let request: supertest.SuperAgentTest;
beforeEach(() => {
  request = supertest.agent(app);
});
afterEach(() => {
  app.close();
});

describe('Product endpoints', () => {
  describe('Create and login User endpoints', () => {
    it('create user - POST - /user (Product endpoints)', async () => {
      const res = await request.post('/user').send(firstUserBody);
      expect(res.status).to.equal(201);
      firstUserIdTest = res.body.id;
    });

    it('login user - POST - /auth (Product endpoints)', async () => {
      const res = await request.post('/auth').send(firstUserBody);
      expect(res.status).to.equal(201);
      accessToken = res.body.accessToken;
      refreshToken = res.body.refreshToken;
    });
  });
});
