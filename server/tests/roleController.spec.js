process.NODE_ENV = 'test';
const Role = require('../models/');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../config/server');
const samples = require('./mockdata');

const expect = chai.expect;

chai.use(chaiHttp);
let userToken, adminToken;
describe('Roles', () => {
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

  describe('/POST Role', () => {
    it('should add a new role if the user is an admin', (done) => {
      chai.request(server)
      .post('/api/roles')
      .send({ title: 'kiba' })
      .set({ 'x-access-token': adminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message').to.equal('Role successfully created');
        expect(res.body).to.have.property('role');
      });
      done();
    });
    it('should add a new role if the user is an admin', (done) => {
      // const role = {
      //   title: 'hajksfhaskjdfhk'
      // };
      chai.request(server)
      .post('/api/roles')
      .send({ title: 'king' })
      .set({ 'x-access-token': adminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
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
        .post('/api/roles/')
        .set({ 'x-access-token': userToken })
      .send(role)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message').to.equal('You are not authorized');
        done();
      });
    });
    it('Should return an error if the title field is not given', (done) => {
      chai.request(server)
        .post('/api/roles')
        .set({ 'x-access-token': adminToken })
        .send({ title: '' })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').to.equal('This field is required');
          done();
        });
    });
    it('Should return an error if the title is not a string', (done) => {
      chai.request(server)
        .post('/api/roles')
        .set({ 'x-access-token': adminToken })
        .send({ title: 358583 })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').to.equal('Invalid input credentials');
          done();
        });
    });

    it('Should return an error if the title field is not given', (done) => {
      chai.request(server)
        .post('/api/roles')
        .set({ 'x-access-token': adminToken })
        .send({ title: '' })
        .end((err, res) => {
          expect(res.status).to.equal(401);
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
        .get('/api/roles')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.length(3);
          expect(res.body).to.be.a('array');
          done();
        });
    });
    it('Should fail to get the roles if the user is not admin', (done) => {
      chai.request(server)
        .get('/api/roles')
        .set({ 'x-access-token': userToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.be.have.property('message').to.equal('You are not authorized');
          done();
        });
    });
  });
  //test get a role by Id
  describe('/GET/:id Role', () => {
    it('Should get a role by id if the user is an admin', (done) => {
      const id = 2;
      chai.request(server)
        .get(`/api/roles/${id}`)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).be.a('object');
          expect(res.body).to.have.property('title');
          expect(res.body).to.have.property('id');
          done();
        });
    });
    it('Should fail to get a role by id if the user is not an admin', (done) => {
      const id = 2;
      chai.request(server)
        .get(`/api/roles/${id}`)
        .set({ 'x-access-token': userToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('message').to.equal('You are not authorized');
          done();
        });
    });
    it('Should fail to get a role by id if the user enters an invalid input', (done) => {
      const id = 'fddjsdcdjn';
      chai.request(server)
        .get(`/api/roles/${id}`)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('message').to.equal(`invalid input syntax for integer: "${id}"`);
          done();
        });
    });
    it('Should fail to get a role by id if the role does not exist', (done) => {
      const id = 250;
      chai.request(server)
        .get(`/api/roles/${id}`)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('message').to.equal('Role not found');
          done();
        });
    });
    it('Should fail to get a role by id if the id is out of range', (done) => {
      const id = 500000000000000000000;
      chai.request(server)
        .get(`/api/roles/${id}`)
        .set({ 'x-access-token': adminToken })
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
          .put(`/api/roles/${id}`)
         .set({ 'x-access-token': adminToken })
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
          .put(`/api/roles/${id}`)
         .set({ 'x-access-token': userToken })
        .send({ title: 'kiba' })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').to.equal('You are not authorized');
          done();
        });
    });
    it('Should fail to update a role by id if the admin enters an invalid input'
      , (done) => {
        const id = 200;
        chai.request(server)
          .put(`/api/roles/${id}`)
         .set({ 'x-access-token': adminToken })
        .send({ title: 'kiba' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').to.equal('Role not found');
          done();
        });
      });
    it('Should fail to update a role by id if the admin enters an id that is out range', (done) => {
      const id = 2000000000000000;
      chai.request(server)
          .put(`/api/roles/${id}`)
         .set({ 'x-access-token': adminToken })
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
    it('Should delete a role given the user had admin access', (done) => {
      const id = 3;
      chai.request(server)
        .delete(`/api/roles/${id}`)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').to.equal('Role has been deleted successfully');
          done();
        });
    });
    it('Should fail to delete a role given the user has no admin access', (done) => {
      const id = 3;
      chai.request(server)
        .delete(`/api/roles/${id}`)
        .set({ 'x-access-token': userToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').to.equal('You are not authorized');
          done();
        });
    });
    it('Should fail to delete a role given the admin enters an invalid input', (done) => {
      const id = 300;
      chai.request(server)
        .delete(`/api/roles/${id}`)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').to.equal('Role not found');
          done();
        });
    });
    it('Should fail to delete a role given the admin enters an input that is out of range', (done) => {
      const id = 3000000000000000;
      chai.request(server)
        .delete(`/api/roles/${id}`)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').to.equal(`value "${id}" is out of range for type integer`);
          done();
        });
    });
  });
});
