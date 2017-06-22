const Sequelize = require('sequelize');
const models = require('../models');

const Document = models.Document;
const User = models.User;


module.exports = {
  // create a new document
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns
   */
  createDocument(req, res) {
    if (!req.body.title) {
      return res.status(401).json({
        title: 'This Field is Required'
      });
    }
    if (!req.body.content) {
      return res.status(401).json({
        content: 'This Field is Required'
      });
    }
    if (!req.body.value) {
      return res.status(401).json({
        value: 'This Field is Required'
      });
    }
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
        if (!document || document.userId !== req.decoded.id) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        } else if (req.body.title === document.title) {
          return res.status(400).send({ message: 'This title already exists' });
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
      .then((document) => {
        if (!document) {
          return res.status(400).json({ success: false, message: 'Document not found' });
        }
        if (document.access === 'public') {
          res.status(200).send(document);
        }
        if (document.access === 'private' && document.userId === req.decoded.id) {
          res.status(200).send(document);
        }
        if (document.access === 'role') {
          return models.User.findById(document.userId)
            .then((documentOwner) => {
              if (documentOwner.roleId !== req.decoded.roleId || req.decoded.roleId !== 1) {
                return res.status(401).json({
                  success: false,
                  message: 'You are not authorized to view this document'
                });
              }
              return res.status(200).send(document);
            }).catch(error => res.status(404).send(error));
        }
      }).catch(error => res.status(404).send(error));
  },
  // Delete a document by Id
  deleteDocument(req, res) {
    return Document
      .findById(req.params.id)
      .then((document) => {
        if (!document) {
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
      if (!user) {
        return res.status(400).json({
          message: 'User not found'
        });
      }
      return Document.findAll({
        where: {
          userId: user.id
        }
      }).then((document => res.status(200).send(document)))
              .catch(error => res.status(404).send(error))
    }).catch(error => res.status(400).send(error));
  },

};

