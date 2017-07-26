process.NODE_ENV = 'test';
const chai = require('chai');
require('dotenv').config();
const chaiHttp = require('chai-http');
const expect = chai.expect;
const EventEmitter = require('events').EventEmitter;
const httpMocks = require('node-mocks-http');
const samples = require('../apiEndpoints/mockdata');
const server = require('../../config/server');
const auth = require('../../middlewares/authentication');

chai.use(chaiHttp);
let adminToken, userToken;
describe('Authentication', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/users/login')
      .send({ email: 'johnbosco.ohia@andela.com', password: process.env.PASSWORD })
      .end((err, res) => {
        adminToken = res.body.token;
        done();
      });
  });
    before((done) => {
    chai.request(server)
      .post('/api/v1/users/login')
      .send({ email: 'testdoe@andela.com', password: 'jamestest' })
      .end((err, res) => {
        userToken = res.body.token;
        done();
      });
  });

  describe('VerifyJwtToken', () => {
    it('Should check if the token is provided with request', (done) => {
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/v1/documents',
      });
      const response = httpMocks.createResponse();
      const nextCallBack = () => { };
      auth.verifyJwtToken(request, response, nextCallBack);
      expect(response._getData().message).to.equal('No token provided.');
      done();
    });
  it('Should provide access if the token is provided and valid', (done) => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/api/v1/documents',
      headers: { 'x-access-token': adminToken }
    });
    const response = httpMocks.createResponse();
    const nextCallBack = () => { };
    auth.verifyJwtToken(request, response, nextCallBack);
    expect(response._getData().message).to.equal(undefined);
    done();
  });
  it('Should deny access if the token is invalid', (done) => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/api/v1/documents/',
      headers: { 'x-access-token': 'themaniscoming' }
    });
    const response = httpMocks.createResponse();
    const nextCallBack = () => { };
    auth.verifyJwtToken(request, response, nextCallBack);

    response.on('end', () => {
      expect(response._getData().success).to.equal(false);
    });
    done();
  });
  });
  describe('AdminAcess', () => {
    it('Should deny access if the user is not admin', (done) => {
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/v1/documents/',
        headers: { 'x-access-token': userToken }
      });
      request.decoded = { roleId: 2 };
      const response = httpMocks.createResponse();
      const nextCallBack = () => { };
      auth.adminAccess(request, response, nextCallBack);
      response.on('end', () => {
        expect(response._getData().message).to.equal('You are not authorized');
      });
      done();
    });
    it('Should grant access if the user is an admin', (done) => {
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/v1/documents/',
        headers: { 'x-access-token': adminToken }
      });
      request.decoded = { roleId: 1 };
      const response = httpMocks.createResponse();
      const nextCallBack = () => { };
      auth.adminAccess(request, response, nextCallBack);
      response.on('end', () => {
        expect(response._getData().message).to.equal(undefined);
      });
      done();
    });
  });
});
