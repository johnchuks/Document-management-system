process.env.NODE_ENV = 'test';

const User = require('../models').User;
// Require the dev-dependencies
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../config/server');
const samples = require('./mockdata');

chai.use(chaiHttp);
let userToken, adminToken;
describe('Users', () => {
  describe('/POST users', () => {
    before((done) => {
      chai.request(server)
      .post('/users/login')
      .send({ email: 'admin@admin.com', password: 'adminpassword' })
      .end((err, res) => {
        adminToken = res.body.token;
        done();
      });
    });
    before((done) => {
      chai.request(server)
      .post('/users/login')
      .send(samples.user)
      .end((err, res) => {
        userToken = res.body.token;
        done();
      });
    });
  });
  describe('/POST users', () => {
    it('it should not post a user without the required field', (done) => {
      const user = {
        fullName: '',
        userName: '',
        email: '',
        password: '',
      };
      chai.request(server)
        .post('/users/')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('message').to.equal('This Field is Required');
          expect(res.body).to.have.property('message').to.equal('This Field is Required');
          expect(res.body).to.have.property('message').to.equal('This Field is Required');
          expect(res.body).to.have.property('message').to.equal('This Field is Required');
          done();
        });
    });
    it('Should post a user if the required fields are required', (done) => {
      chai.request(server)
        .post('/users')
        .send(samples.sampleUser1)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('Should generate a token when the user is created', (done) => {
      chai.request(server)
        .post('/users')
        .send(samples.sampleUser3)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('success').to.equal(true);
          expect(res.body).to.have.property('message').to.equal('Enjoy your token');
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('Should fail if a user enters an invalid email address', (done) => {
      chai.request(server)
        .post('/users')
        .send(samples.sampleUser2)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('email').to.equal('Email is not rightly formatted');
          done();
        });
    });
  });
  it('Should post the user crendentials upon login', (done) => {
    chai.request(server)
        .post('/users/login')
        .send(samples.user)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
  });
  it('Should generate a token when the user is logged in', (done) => {
    chai.request(server)
        .post('/users/login')
        .send(samples.user)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('success').to.equal(true);
          expect(res.body).to.have.property('message').to.equal('Enjoy your token');
          expect(res.body).to.have.property('token');
          done();
        });
  });
});
it('Should get all the users', (done) => {
  chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          if (!err) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
          }
          done();
        });
});

