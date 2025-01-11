import { expect } from 'chai';
import sinon from 'sinon';
import supertest from 'supertest';
import { app } from '../index.js';
import User from '../models/User-model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

describe('User Controller', function () {
  let request;

  before(() => {
    request = supertest(app);
  });

  describe('GET /user', function () {
    it('should return all users successfully', async function () {
      const fakeUsers = [
        { _id: 'user1', username: 'User1', email: 'user1@gmail.com' },
        { _id: 'user2', username: 'User2', email: 'user2@gmail.com' },
      ];
      sinon.stub(User, 'find').returns(Promise.resolve(fakeUsers));

      const response = await request.get('/user');

      expect(response.status).to.equal(200);
      expect(response.body.users).to.have.length(2);
      expect(response.body.users[0].email).to.equal('user1@gmail.com');
    });
  });

  describe('POST /signup', function () {
    it('should return 422 for invalid inputs', async function () {
        const response = await request.post('/user/signup').send({
          username: '',
          email: '',
          password: '',
        });
  
        expect(response.status).to.equal(422);
        expect(response.body.message).to.equal('Invalid Inputs');
      });

    it('should sign up a user successfully', async function () {
      const fakeUser = {
        username: 'user10',
        email: 'user10@gmail.com',
        password: '12345',
      };
      sinon.stub(User.prototype, 'save').returns(Promise.resolve(fakeUser));
      sinon.stub(bcrypt, 'hashSync').returns('12345');

      const response = await request.post('/user/signup').send({
        username: 'user10',
        email: 'user10@gmail.com',
        password: '12345',
      });

      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal('Sign up success.Login again');
      expect(response.body.user.email).to.equal('user10@gmail.com');
    });
  });

  describe('POST /login', function () {
    it('should login successfully with valid credentials', async function () {
      const fakeUser = {
        _id: 'user10',
        email: 'user10@gmail.com',
        password: '12345',
      };
      sinon.stub(User, 'findOne').returns(Promise.resolve(fakeUser));
      sinon.stub(bcrypt, 'compareSync').returns(true);
      sinon.stub(jwt, 'sign').returns('fakeToken');

      const response = await request.post('/user/login').send({
        email: 'user10@gmail.com',
        password: '12345',
      });

      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('Login Successfully');
      expect(response.body.token).to.equal('fakeToken');
    });

    it('should return 400 for incorrect password', async function () {
      const fakeUser = {
        _id: 'user10',
        email: 'user10@gmail.com',
        password: 'wrongPassword',
      };
      sinon.stub(User, 'findOne').returns(Promise.resolve(fakeUser));
      sinon.stub(bcrypt, 'compareSync').returns(false);

      const response = await request.post('/user/login').send({
        email: 'user10@gmail.com',
        password: 'wrongPassword',
      });

      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('Incorrect Password');
    });

    it('should return 404 if user not found', async function () {
      sinon.stub(User, 'findOne').returns(Promise.resolve(null));

      const response = await request.post('/user/login').send({
        email: 'user00@gmail.com',
        password: '12345',
      });

      expect(response.status).to.equal(404);
      expect(response.body.message).to.equal('Unable to find user from this ID');
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});
