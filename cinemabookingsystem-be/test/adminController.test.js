import { expect } from 'chai';
import sinon from 'sinon';
import supertest from 'supertest';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {app} from '../index.js';
import Admin from '../models/Admin-model.js';

describe('Admin Controller', function () {
  let request;

  before(() => {
    request = supertest(app);

  });
  
  before((done) => {
    setTimeout(() => {
      done();
    }, 1000);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('POST /admin/signup', function () {
    it('should return status 422 for invalid input', async function () {
      const response = await request
        .post('/admin/signup')
        .send({ username: '', email: '', password: '' });
      expect(response.status).to.equal(422);
      expect(response.body.message).to.equal('Invalid Inputs');
    });

    it('should return status 400 if admin already exists', async function () {
      const fakeAdmin = { email: 'admin@example.com' };
      sinon.stub(Admin, 'findOne').returns(Promise.resolve(fakeAdmin));

      const response = await request
        .post('/admin/signup')
        .send({ username: 'admin', email: 'admin@example.com', password: 'password' });
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('Admin already exists');
    });

    it('should return status 201 and success message on successful sign up', async function () {
      const fakeAdmin = { username: 'admin', email: 'admin@example.com', password: 'hashedPassword' };
      sinon.stub(Admin.prototype, 'save').returns(Promise.resolve(fakeAdmin));
      sinon.stub(bcrypt, 'hashSync').returns('hashedPassword');

      const response = await request
        .post('/admin/signup')
        .send({ username: 'admin', email: 'admin@example.com', password: 'password' });

      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal('Sign up success.Login again');
    });
  });

  describe('POST /admin/login', function () {
    it('should return status 422 for invalid input', async function () {
      const response = await request
        .post('/admin/login')
        .send({ email: '', password: '' });
      expect(response.status).to.equal(422);
      expect(response.body.message).to.equal('Invalid Inputs');
    });

    it('should return status 400 if admin is not found', async function () {
      sinon.stub(Admin, 'findOne').returns(Promise.resolve(null));

      const response = await request
        .post('/admin/login')
        .send({ email: 'admin@example.com', password: 'password' });
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('Admin not found');
    });

    it('should return status 400 for incorrect password', async function () {
      const fakeAdmin = { email: 'admin@example.com', password: 'hashedPassword' };
      sinon.stub(Admin, 'findOne').returns(Promise.resolve(fakeAdmin));
      sinon.stub(bcrypt, 'compareSync').returns(false);

      const response = await request
        .post('/admin/login')
        .send({ email: 'admin@example.com', password: 'wrongPassword' });
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('Incorrect Password');
    });

    it('should return status 200 and a JWT on successful login', async function () {
      const fakeAdmin = { _id: '123', email: 'admin@example.com', password: 'hashedPassword' };
      sinon.stub(Admin, 'findOne').returns(Promise.resolve(fakeAdmin));
      sinon.stub(bcrypt, 'compareSync').returns(true);
      sinon.stub(jwt, 'sign').returns('fake-jwt-token');

      const response = await request
        .post('/admin/login')
        .send({ email: 'admin@example.com', password: 'password' });

      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('Authentication Complete');
      expect(response.body.token).to.equal('fake-jwt-token');
    });
  });
});
