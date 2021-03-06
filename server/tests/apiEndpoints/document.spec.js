process.NODE_ENV = 'test';
const chai = require('chai');
require('dotenv').config();
const chaiHttp = require('chai-http');
const server = require('../../config/server');
const samples = require('./mockdata');

const expect = chai.expect;

chai.use(chaiHttp);
let userToken, adminToken, sampleUserToken;
describe('Documents', () => {
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
  before((done) => {
    chai.request(server)
      .post('/api/v1/users/login')
      .send({ email: 'testdoe@andela.com', password: 'jamestest' })
      .end((err, res) => {
        sampleUserToken = res.body.token;
        done();
      });
  });
  describe('/POST Document', () => {
    it('should add a new document if the user is authenticated', (done) => {
      const document = {
        title: 'kiba-team',
        content: 'Andela is really awesome!!!',
        value: 'public',
        userId: 2,
      };
      chai.request(server)
      .post('/api/v1/documents')
      .send(document)
      .set({ 'authorization': userToken })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('title').to.be.equal('kiba-team');
        expect(res.body).to.have.property('content').to.be.equal('Andela is really awesome!!!');
        expect(res.body).to.have.property('access').to.be.equal('public');
        done();
      });
    });
    it('Should fail if document already exist', () => {
      const document = {
        title: 'kiba-team',
        content: 'eze goes to school',
        access: 'public',
      };
      chai.request(server)
      .post('/api/v1/documents')
      .send({'authorization': userToken })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.have
          .property('message').to.equal('A document with this title <br />currently exist');
      });
    });
    it('should fail to add a new document if the value field is missing', (done) => {
      const document = {
        title: 'kiba-team',
        content: 'Andela is really awesome!!!',
        value: '',
        userId: 1,
      };
      chai.request(server)
      .post('/api/v1/documents')
      .send(document)
      .set({ 'authorization': userToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message').to.be.equal('access type is Required');
        done();
      });
    });
    it('should fail to  add a new document if the title field is missing', (done) => {
      const document = {
        title: '',
        content: 'Andela is really awesome!!!',
        value: 'public',
        userId: 2,
      };
      chai.request(server)
      .post('/api/v1/documents')
      .send(document)
      .set({ 'authorization': userToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message').to.be.equal('Title field is Required');
        done();
      });
    });
    it('should fail to add a new document if the content field is missing', (done) => {
      const document = {
        title: 'kiba-team',
        content: '',
        value: 'public',
        userId: 2,
      };
      chai.request(server)
      .post('/api/v1/documents')
      .send(document)
      .set({ 'authorization': userToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message').to.be.equal('Content field is Required');
        done();
      });
    });
    it('should fail to add a new document if the user is not authenticated', (done) => {
      const document = {
        title: 'kiba-team',
        content: 'Andela is really awesome !!!',
        value: 'private',
        userId: 2,
      };
      chai.request(server)
      .post('/api/v1/documents')
      .send(document)
        .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('message').to.be.equal('No token provided.');
        done();
      });
    });
  });
  describe('/GET Documents', () => {
    it('Should get all documents for the user that is authenticated', (done) => {
      chai.request(server)
      .get('/api/v1/documents')
      .set({ 'authorization': userToken })
        .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('document');
        expect(res.body).to.have.property('pagination');
        expect(res.body.document[2]).to.have.property('title').to.equal('kiba-team');
        expect(res.body.document[2]).to.have
        .property('content').to.equal('Andela is really awesome!!!');
        expect(res.body.document[2]).to.have.property('access').to.equal('public');
        expect(res.body.pagination).to.have.property('totalCount').to.equal(3);
        done();
      });
    });
    it('should fail to get all documents if the user is not authenticated', (done) => {
      chai.request(server)
      .get('/api/v1/documents/')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('message').to.be.equal('No token provided.');
        done();
      });
    });
    it('Should get all documents with correct limit and offset as a query and ', (done) => {
      const limit = 1;
      const offset = 0;
      chai.request(server)
        .get(`/api/v1/documents?limit=${limit}&offset=${offset}`)
        .set({ 'authorization': userToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.document[0]).to.have.property('title').to.equal('John Doe');
          expect(res.body.document[0]).to.have.property('id').to.equal(1);
          expect(res.body.document[0]).to.have.property('access').to.equal('public');
          expect(res.body.document[0]).to.have.property('userId').to.equal(2);
          expect(res.body.document[0]).to.have.property('content').to.equal('eze goes to school');
          expect(res.body.pagination).to.have.property('totalCount').to.equal(3);
          expect(res.body.pagination).to.have.property('pageCount').to.equal(3);
          done();
        });
    });
  });
  describe('/GET/users/:id/documents Documents', () => {
    it('Should fail to get documents if the user does not exist', (done) => {
      const userId = 9;
      chai.request(server)
        .get(`/api/v1/users/${userId}/documents`)
        .set({ 'authorization': userToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('message').to.equal('User not found');
          done();
        });
    });
    it('Should fail to get documents if there is no token present', (done) => {
      const userId = 2;
      chai.request(server)
        .get(`/api/v1/users/${userId}/documents`)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('message').to.equal('No token provided.');
          done();
        });
    });
    it('Should get documents for the user with its unique userId', (done) => {
      const userId = 2;
      chai.request(server)
        .get(`/api/v1/users/${userId}/documents`)
        .set({ 'authorization': userToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.document[0]).to.have.property('userId').to.equal(2);
          expect(res.body.document[0]).to.have.property('title')
          .to.equal('kiba-team');
          expect(res.body.document[0]).to.have.property('content')
          .to.equal('Andela is really awesome!!!');
          done();
        });
    });
  });

  describe('/GET/:id Document', () => {
    it('Should fail to get document if it doesn`t exist', (done) => {
      const documentId = 8;
      chai.request(server)
        .get(`/api/v1/documents/${documentId}/`)
        .set({ 'authorization': userToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('message').to.equal('Document not found');
          done();
        });
    });
    it('Should get all public regardless of id', (done) => {
      const documentId = 4;
      chai.request(server)
        .get(`/api/v1/documents/${documentId}/`)
        .set({ 'authorization': userToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('id').to.equal(4);
          expect(res.body).to.have.property('title').to.equal('kiba-team');
          expect(res.body).to.have.property('access').to.equal('public');
          done();
        });
    });
    it('Should fail to get a private document if the requester does not own it', (done) => {
      const documentId = 2;
      chai.request(server)
        .get(`/api/v1/documents/${documentId}/`)
        .set({ 'authorization': sampleUserToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('message').to.equal('You are not authorized to view this document');
          done();
        });
    });
     it('Should get a private document if the requester is the owner', (done) => {
      const documentId = 2;
      chai.request(server)
        .get(`/api/v1/documents/${documentId}/`)
        .set({ 'authorization': userToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('access').to.equal('private');
          expect(res.body).to.have.property('title').to.equal('John naddddd');
          expect(res.body).to.have.property('id').to.equal(2);
          expect(res.body).to.have.property('userId').to.equal(2);
          done();
        });
    });
    it('Should fail get a role document if the users are not on the same role', (done) => {
      const documentId = 3;
      chai.request(server)
        .get(`/api/v1/documents/${documentId}/`)
        .set({ 'authorization': sampleUserToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('message').to.equal('You are not authorized to view this document');
          done();
        });
    });
    it('Should get a role document if the users are on the same role', (done) => {
      const documentId = 3;
      chai.request(server)
        .get(`/api/v1/documents/${documentId}/`)
        .set({ 'authorization': userToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('id').to.equal(3);
          expect(res.body).to.have.property('title').to.equal('James Hannn');
          expect(res.body).to.have.property('access').to.equal('role');
          done();
        });
    });
    it('Should get a role document if the user is an admin', (done) => {
      const documentId = 3;
      chai.request(server)
        .get(`/api/v1/documents/${documentId}/`)
        .set({ 'authorization': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('id').to.equal(3);
          expect(res.body).to.have.property('title').to.equal('James Hannn');
          expect(res.body).to.have.property('access').to.equal('role');
        });
        done();
    });
  });
   describe('/PUT/:id, Document', () => {
    it('Should update a document by id if the user has the same id',
     (done) => {
      const id = 2;
      chai.request(server)
        .put(`/api/v1/documents/${id}`)
        .set({ 'authorization': userToken })
        .send({ title: 'narruto shippuden' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('id').to.equal(2);
          expect(res.body).to.have.property('title').to.equal('narruto shippuden');
          done();
        });
    });
    it('Should fail to update a document by id if the user does not have the same id',
     (done) => {
      const id = 2;
      chai.request(server)
        .put(`/api/v1/documents/${id}`)
        .set({ 'authorization': sampleUserToken })
        .send({ title: 'narruto shippuden' })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('message').to.equal('You are not authorized to update this document');
          done();
        });
    });
    it('Should not update a document by id if the user has admin access',
     (done) => {
      const id = 2;
      chai.request(server)
        .put(`/api/v1/documents/${id}`)
        .set({ 'authorization': adminToken })
        .send({ title: 'narruto' })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
    it('Should fail to update a document by id if the document does not exist',
     (done) => {
      const id = 10;
      chai.request(server)
        .put(`/api/v1/documents/${id}`)
        .set({ 'authorization': userToken })
        .send({ title: 'narruto shippuden' })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('message').to.equal('Document not found');
          done();
       });
    });
   });

   describe('DELETE/:id Document', () => {
    it('Should delete a document given the user has admin access', (done) => {
      const id = 3;
      chai.request(server)
        .delete(`/api/v1/documents/${id}`)
        .set({ 'authorization': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(204);
          done();
        });
    });
     it('Should delete a document given the user is the owner', (done) => {
      const id = 2;
      chai.request(server)
        .delete(`/api/v1/documents/${id}`)
        .set({ 'authorization': userToken })
        .end((err, res) => {
          expect(res.status).to.equal(204);
          done();
        });
    });
     it('Should fail to delete the document given the user is not the owner', (done) => {
      const id = 1;
      chai.request(server)
        .delete(`/api/v1/documents/${id}`)
        .set({ 'authorization': sampleUserToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('message').to.equal('You are not authorized to delete this document');
          done();
        });
    });
    it('Should fail to delete if the document does not exist', (done) => {
      const id = 234;
      chai.request(server)
        .delete(`/api/v1/documents/${id}`)
        .set({ 'authorization': userToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('message').to.equal('Document not found');
          done();
        });
    });
   });
   describe('/SEARCH/documents/?q=', () => {
     it('Should return an error if no querystring is provided', () => {
       const query='';
       chai.request(server)
        .get(`/api/v1/search/documents/?q=${query}`)
        .set({'authorization': userToken })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('message').to.equal('Invalid search input')
        });
     });
     it('Should return a search list of the required search input', () => {
       const query='John';
       chai.request(server)
        .get(`/api/v1/search/documents/?q=${query}`)
        .set({'authorization': userToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('document');
          expect(res.body.document[0]).to.have.property('title').to.equal('John Doe');
          expect(res.body.document[0]).to.have.property('content').to.equal('eze goes to school');
          expect(res.body).to.have.property('pagination');
          expect(res.body.paginaton).to.have.property('totalCount').to.equal(1);
        });
     });
     it('Should throw an error if the searched document is not found', () => {
       const query='jk';
       chai.request(server)
        .get(`/api/v1/search/documents/?q=${query}`)
        .set({'authorization': userToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('message').to.equal('Document not found');
        });
     })
   });
});
