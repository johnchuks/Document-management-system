const Sequelize = require('sequelize');
const models = require('../models');

const Document = models.Document;
const User = models.User;


module.exports = {
  // create a new document
  createDocument(req, res) {  // edge cases here !!!!!!!!!!!
    return Document
      .create({
        title: req.body.title,
        content: req.body.content,
        access: req.body.value,
        userId: req.body.userId
      })
      .then(documentResponse => res.status(201).send(documentResponse))
      .catch(error => res.status(400).send(error));
  },

  // update a single document for the user
  updateDocument(req, res) {
    return Document
      .findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }
        return document
           .update({
             title: req.body.title || document.title,
             content: req.body.content || document.content,
             access: req.body.access || document.access,
             userId: req.body.userId || document.userId
           })
           .then(() => res.status(200).send(document))
           .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  // find a document by Id
  findDocument(req, res) {
    return Document
      .findById(req.params.id)
      .then(document => res.status(200).send(document))
      .catch(error => res.status(404).send(error));
  },
  // Delete a document by Id
  deleteDocument(req, res) {
    return Document
      .findById(req.params.id)
      .then((document) => {
        if(!document) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }
        return Document
          .delete()
          .then(() => res.status(200).send())
          .catch(error => res.status(404).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  // get all documents
  getAllDocuments(req, res) {
    const limit = req.query.limit;
    const offset = req.query.offset;
    return Document
    .findAll({ limit,
      offset,
      where: {
        access: {
          $ne: 'private'
        }
      },
      include: [{
        model: User,
        attributes: ['userName', 'roleId']
      }], })
    .then(document => res.status(200).send(document))
    .catch(error => res.status(400).send(error));
  },
  // get documents for a particular user
  getSpecificUserDocuments(req, res) {
    User.findById(req.params.id).then((user) => {
      console.log(user.id, 'user');
      return Document.findAll({
        where: {
          userId: user.id
        }
      }).then((document => res.status(200).send(document)))
              .catch(error => res.status(404).send(error))
    }).catch(error => res.status(400).send(error));
  },
  // get private documents for user

};

