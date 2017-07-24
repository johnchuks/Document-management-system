process.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
require('dotenv').config();
const server = require('../../config/server');
const samples = require('./mockdata');

const expect = chai.expect;

chai.use(chaiHttp);
let userToken, adminToken;
describe('Roles', () => {
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
      .send(samples.user)
      .end((err, res) => {
        userToken = res.body.token;
        done();
      });
  });

  describe('/POST Role', () => {
    it('should add a new role if the user is an admin', (done) => {
      chai.request(server)
      .post('/api/v1/roles')
      .send({ title: 'kiba' })
      .set({ 'authorization': adminToken })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message').to.equal('Role successfully created');
        expect(res.body).to.have.property('role');
        expect(res.body.role).to.have.property('title').to.equal('kiba');
      });
      done();
    });
    it('should add a new role if the user is an admin', (done) => {
      chai.request(server)
      .post('/api/v1/roles')
      .send({ title: 'king' })
      .set({ 'authorization': adminToken })
      .end((err, res) => {
        expect(res.status).to.equal(204);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message').to.equal('Role successfully created');
        expect(res.body).to.have.property('role');
      });
      done();
    });
    it('Should fail if a non-admin wants to add a new role', (done) => {
      const role = {
        title: 'kiba-team'
      };
      chai.request(server)
        .post('/api/v1/roles/')
        .set({ 'authorization': userToken })
      .send(role)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message').to.equal('You are not authorized');
        done();
      });
    });
    it('Should return an error if the title field is not given', (done) => {
      chai.request(server)
        .post('/api/v1/roles')
        .set({ 'authorization': adminToken })
        .send({ title: '' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').to.equal('This field is required');
        });
        done();
    });
    it('Should return an error if the title is not a string', (done) => {
      chai.request(server)
        .post('/api/v1/roles')
        .set({ 'authorization': adminToken })
        .send({ title: 358583 })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').to.equal('Invalid input credentials');
          done();
        });
    });

    it('Should return an error if the title field is not given', (done) => {
      chai.request(server)
        .post('/api/v1/roles')
        .set({ 'authorization': adminToken })
        .send({ title: '' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').to.equal('This field is required');
          done();
        });
    });
  });
  // Test getting all the roles
  describe('/GET Role', () => {
    it('Should get all the roles if the user is an admin', (done) => {
      chai.request(server)
        .get('/api/v1/roles')
        .set({ 'authorization': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.length(4);
          expect(res.body).to.be.a('array');
          expect(res.body[0]).to.have.property('id').to.equal(1);
          expect(res.body[0]).to.have.property('title').to.equal('admin')
          expect(res.body[1]).to.have.property('id').to.equal(2);
          expect(res.body[1]).to.have.property('title').to.equal('regular');
          done();
        });
    });
    it('Should fail to get the roles if the user is not admin', (done) => {
      chai.request(server)
        .get('/api/v1/roles')
        .set({ 'authorization': userToken })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.have.property('message').to.equal('You are not authorized');
          done();
        });
    });
  });

  describe('/GET/:id Role', () => {
    it('Should get a role by id if the user is an admin', (done) => {
      const id = 2;
      chai.request(server)
        .get(`/api/v1/roles/${id}`)
        .set({ 'authorization': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).be.a('object');
          expect(res.body).to.have.property('title').to.equal('regular');
          expect(res.body).to.have.property('id').to.equal(2);
          done();
        });
    });
    it('Should fail to get a role by id if the user is not an admin', (done) => {
      const id = 2;
      chai.request(server)
        .get(`/api/v1/roles/${id}`)
        .set({ 'authorization': userToken })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('message').to.equal('You are not authorized');
          done();
        });
    });
    it('Should fail to get a role by id if the user enters an invalid input', (done) => {
      const id = 'fddjsdcdjn';
      chai.request(server)
        .get(`/api/v1/roles/${id}`)
        .set({ 'authorization': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('message').to.equal(`invalid input syntax for integer: "${id}"`);
          done();
        });
    });
    it('Should fail to get a role by id if the role does not exist', (done) => {
      const id = 250;
      chai.request(server)
        .get(`/api/v1/roles/${id}`)
        .set({ 'authorization': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('message').to.equal('Role not found');
          done();
        });
    });
    it('Should fail to get a role by id if the id is out of range', (done) => {
      const id = 500000000000000000000;
      chai.request(server)
        .get(`/api/v1/roles/${id}`)
        .set({ 'authorization': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('message').to.equal(`value "${id}" is out of range for type integer`);
          done();
        });
    });
  });
  describe('/PUT/:id Role', () => {
    it('Should update a role by id if the user has admin access', (done) => {
      const id = 2;
      chai.request(server)
          .put(`/api/v1/roles/${id}`)
         .set({ 'authorization': adminToken })
        .send({ title: 'kiba' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').to.equal('Role updated successfully');
          expect(res.body).to.have.property('role');
          done();
        });
    });
    it('Should fail to update a role by id if the user has no admin access', (done) => {
      const id = 2;
      chai.request(server)
          .put(`/api/v1/roles/${id}`)
         .set({ 'authorization': userToken })
        .send({ title: 'kiba' })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').to.equal('You are not authorized');
          done();
        });
    });
    it('Should fail to update a role by id if the admin enters an invalid input'
      , (done) => {
        const id = 200;
        chai.request(server)
          .put(`/api/v1/roles/${id}`)
         .set({ 'authorization': adminToken })
        .send({ title: 'kiba' })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').to.equal('Role not found');
          done();
        });
      });
    it('Should fail to update a role by id if the admin enters an id that is out range', (done) => {
      const id = 2000000000000000;
      chai.request(server)
          .put(`/api/v1/roles/${id}`)
         .set({ 'authorization': adminToken })
        .send({ title: 'regular' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').to.equal(`value "${id}" is out of range for type integer`);
          done();
        });
    });
  });
  describe('/DELETE/:id Role', () => {
    it('Should delete a role given the user has admin access', (done) => {
      const id = 3;
      chai.request(server)
        .delete(`/api/v1/roles/${id}`)
        .set({ 'authorization': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(204);
          expect(res.body).to.be.a('object');
        });
       done();
    });
    it('Should fail to delete a role given the user has no admin access', (done) => {
      const id = 3;
      chai.request(server)
        .delete(`/api/v1/roles/${id}`)
        .set({ 'authorization': userToken })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').to.equal('You are not authorized');
          done();
        });
    });
    it('Should fail to delete a role given the admin enters an invalid input', (done) => {
      const id = 300;
      chai.request(server)
        .delete(`/api/v1/roles/${id}`)
        .set({ 'authorization': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').to.equal('Role not found');
          done();
        });
    });
    it('Should fail to delete a role given the admin enters an input that is out of range', (done) => {
      const id = 3000000000000000;
      chai.request(server)
        .delete(`/api/v1/roles/${id}`)
        .set({ 'authorization': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').to.equal(`value "${id}" is out of range for type integer`);
          done();
        });
    });
  });
});
