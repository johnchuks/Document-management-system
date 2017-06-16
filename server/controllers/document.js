const models = require('../models');

const Document = models.Document;

module.exports = {
  // create a new document
  createDocument(req, res) {
    return Document
      .create({
        title: req.body.title,
        content: req.body.content,
        access: req.body.access,
        userId: req.body.userId
      })
      .then(documentResponse => res.status(201).send(documentResponse))
      .catch(error => res.status(400).send(error));
  },
  // update a sigle document for the user
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
      .findById(req, params.id)
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
    .findAll({ limit, offset })
    .then(document => res.status(200).send(document))
    .catch(error => res.status(400).send(error));
  }

};

