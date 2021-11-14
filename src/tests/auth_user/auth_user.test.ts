/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { afterEach, beforeEach } from 'mocha';
import shortid from 'shortid';
import supertest from 'supertest';
import app from '../../../index';

let firstUserIdTest = '';
const firstUserBody = {
  email: `example+${shortid.generate()}@example.com`,
  password: 'Sup3rSecret!23'
};
let accessToken = '';
let refreshToken = '';
const newFirstName = 'Jose';
const newFirstName2 = 'Paulo';
const newLastName2 = 'Faraco';

let request: supertest.SuperAgentTest;
beforeEach(async () => {
  request = await supertest.agent(app);
});
afterEach(() => {
  app.close();
});

describe('User and Auth endpoints', () => {
  it('create user - POST - /user', async () => {
    const res = await request.post('/user').send(firstUserBody);
    expect(res.status).to.equal(201);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.be.a('string');
    firstUserIdTest = res.body.id;
  });

  it('login user - POST - /auth', async () => {
    const res = await request.post('/auth').send(firstUserBody);
    expect(res.status).to.equal(201);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.accessToken).to.be.a('string');
    expect(res.body.refreshToken).to.be.a('string');
    accessToken = res.body.accessToken;
    refreshToken = res.body.refreshToken;
  });

  it('get user - GET - /user/:userId - token', async () => {
    const res = await request
      .get(`/user/${firstUserIdTest}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.be.a('string');
    expect(res.body.id).to.equal(firstUserIdTest);
    expect(res.body.email).to.equal(firstUserBody.email);
  });

  describe('User with a valid access token but not permission', () => {
    it('get All - GET - /user', async () => {
      const res = await request
        .get('/user')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send();
      expect(res.status).to.equal(403);
    });

    it('edit patch user disallow - PATCH - /user/:userId', async () => {
      const res = await request
        .patch(`/user/${firstUserIdTest}`)
        .set({ Authorization: `Bearer y${accessToken}y` })
        .send({
          firstName: newFirstName
        });
      expect(res.status).to.equal(403);
    });

    it('should disallow edit an nonexistent ID - PUT - /user/:userId', async () => {
      const res = await request
        .put('/user/i-do-not-exist')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({
          email: firstUserBody.email,
          password: firstUserBody.password,
          firstName: 'Marcos',
          lastName: 'Silva'
        });
      expect(res.status).to.equal(400);
    });

    it('should disallow trying to change the permission - PUT - /user/:userId', async () => {
      const res = await request
        .put(`/user/${firstUserIdTest}`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({
          email: firstUserBody.email,
          password: firstUserBody.password,
          firstName: 'Marcos',
          lastName: 'Silva',
          rol: 1
        });
      expect(res.status).to.equal(400);
      expect(res.body.errors).to.be.an('array');
      expect(res.body.errors).to.have.length(1);
      expect(res.body.errors[0]).to.equal('User cannot change permission');
    });

    // it('should allow for testing - PUT - /user/:userId/rol/1', async () => {
    //   const res = await request
    //     .put(`/user/${firstUserIdTest}/rol/1`)
    //     .set({ Authorization: `Bearer ${accessToken}` })
    //     .send({});
    //   expect(res.status).to.equal(204);
    // });

    //   describe('with a new set of permission', () => {
    //     it('should allow a refresh token - POST - /auth/refresh-token', async () => {
    //       const res = await request
    //         .post('/auth/refresh-token')
    //         .set({ Authorization: `Bearer ${accessToken}` })
    //         .send({ refreshToken });
    //       expect(res.status).to.equal(201);
    //       expect(res.body).not.to.be.empty;
    //       expect(res.body).to.be.an('object');
    //       expect(res.body.accessToken).to.be.a('string');
    //       expect(res.body.accessToken).not.to.equal(accessToken);
    //       refreshToken = res.body.refreshToken;
    //     });
    //     it('should allow edit user - PUT - /user/:userId', async () => {
    //       const res = await request
    //         .put(`/user/${firstUserIdTest}`)
    //         .set({ Authorization: `Bearer ${accessToken}` })
    //         .send({
    //           email: firstUserBody.email,
    //           password: firstUserBody.password,
    //           firstName: newFirstName2,
    //           lastName: newLastName2
    //         });
    //       expect(res.status).to.equal(204);
    //     });
    //     it('should allow and should have a new full name - GET - /user/:userId', async () => {
    //       const res = await request
    //         .get(`/user/${firstUserIdTest}`)
    //         .set({ Authorization: `Bearer ${accessToken}` })
    //         .send();
    //       expect(res.status).to.equal(200);
    //       expect(res.body).not.to.be.empty;
    //       expect(res.body).to.be.an('object');
    //       expect(res.body.id).to.be.a('string');
    //       expect(res.body.firstName).to.equal(newFirstName2);
    //       expect(res.body.lastName).to.equal(newLastName2);
    //       expect(res.body.email).to.equal(firstUserBody.email);
    //       expect(res.body.id).to.equal(firstUserIdTest);
    //     });
    //     it('should allow a delete user - DELETE - /user/:userId', async () => {
    //       const res = await request
    //         .delete(`/user/${firstUserIdTest}`)
    //         .set({ Authorization: `Bearer ${accessToken}` })
    //         .send();
    //       expect(res.status).to.equal(204);
    //     });
    //   });
  });
});
