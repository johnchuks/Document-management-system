const Sequelize = require('sequelize');
const models = require('../models');
const pagination = require('../helpers/helper.js');

const Document = models.Document;
const User = models.User;
const metaData = pagination.paginationMetaData;

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
      return res.status(400).json({
        message: 'This Field is Required'
      });
    }
    if (!req.body.content) {
      return res.status(400).json({
        message: 'This Field is Required'
      });
    }
    if (!req.body.value) {
      return res.status(400).json({
        message: 'This Field is Required'
      });
    }
    Document.findAll({
      where: {
        title: req.body.title
      }
    }).then((document) => {
      if (document.length === 0) {
        return Document.create({
          title: req.body.title,
          content: req.body.content,
          access: req.body.value,
          userId: req.body.userId
        })
      .then(documentResponse => res.status(201).send(documentResponse))
      .catch(error => res.status(400).send(error));
      }
      return res.status(403).json({
        message: 'Document already exists'
      });
    }).catch(error => res.status(400).send(error));
  },

  // update a single document for the user
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns
   */
  updateDocument(req, res) {
    if (isNaN(req.params.id)) {
      return res.status(400);
    }
    const queryId = Number(req.params.id);
    return Document.findById(queryId)
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found'
          });
        }
        if (Number(document.userId) !== Number(req.decoded.id)) {
          return res.status(401).json({
            message: 'You are not authorized to delete this document'
          });
        }
        return document
          .update({
            title: req.body.title || document.title,
            content: req.body.content || document.content,
            access: req.body.value || document.access,
            userId: req.body.userId || document.userId
          })
          .then(() => res.status(200).send(document))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  // find a document by Id
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns
   */
  findDocument(req, res) {
    return Document.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404).json({
            message: 'Document not found'
          });
        }
        if (req.decoded.roleId === 1) {
          return document;
        }
        if (document.access === 'public') {
          return res.status(200).send(document);
        }
        if (document.access === 'private') {
          if (document.userId !== req.decoded.id) {
            return res.status(401).json({
              message: 'You are not authorized to view this document'
            });
          }
          return res.status(200).send(document);
        }
        if (document.access === 'role') {

          return models.User
            .findById(document.userId)
            .then((documentOwner) => {
              if (
                Number(documentOwner.roleId) !== Number(req.decoded.roleId)
              ) {
                return res.status(401).json({
                  message: 'You are not authorized to view this document'
                });
              }
              return res.status(200).send(document);
            })
            .catch(error => res.status(400).send(error));
        }
      })
      .catch(error => res.status(400).send(error));
  },
  // Delete a document by Id
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns
   */
  deleteDocument(req, res) {
    return Document.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found'
          });
        }
        if (
          req.decoded.roleId !== 1 &&
          Number(document.userId) !== Number(req.decoded.id)
        ) {
          return res.status(401).json({
            message: 'You are not authorized to delete this document'
          });
        }
        return document
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  // get all documents
  /**
   *
   *
   * @param {string} req
   * @param {object} res
   * @returns
   */
  getAllDocuments(req, res) {
    const limit = req.query.limit;
    const offset = req.query.offset;
    if (req.decoded.roleId === 1) {
      return Document.findAndCountAll({
        limit,
        offset,
        where: {
          access: {
            $ne: 'private'
          }
        },
        include: [
          {
            model: User,
            attributes: ['userName', 'roleId']
          }
        ]
      })
      .then(({ rows: document, count }) => {
        res.status(200).send({
          document,
          pagination: metaData(count, limit, offset),
        });
      })
      .catch(error => res.status(400).send(error));
    } else if (req.decoded.roleId !== 1) {
      return Document.findAndCountAll({
        limit,
        offset,
        include: [
          {
            model: User,
            attributes: ['userName', 'roleId'],
            where: {
              roleId: req.decoded.roleId
            },
          },
        ],
        where: {
          access: {
            $ne: 'private'
          }
        },

      })
      .then(({ rows: document, count }) => {
        res.status(200).send({
          document,
          pagination: metaData(count, limit, offset),
        });
      })
      .catch(error => res.status(400).send(error));
    }
  },

  /**
   *
   *
   * @param {string} req
   * @param {object} res
   */
  getSpecificUserDocuments(req, res) {
    const limit = req.query.limit;
    const offset = req.query.offset;
    User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'User not found'
          });
        }
        return Document.findAndCountAll({
          limit,
          offset,
          where: {
            userId: user.id
          }
        })
          .then(({ rows: document, count }) => {
            res.status(200).send({
              document,
              pagination: metaData(count, limit, offset),
            });
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  /**
   *
   *
   * @param {string} req
   * @param {array} res
   * @returns
   */
  searchDocuments(req, res) {
    const limit = req.query.limit,
      offset = req.query.offset,
      queryString = req.query.q;
    if (!queryString) {
      return res.status(400).json({
        message: 'Invalid search input'
      });
    }
    if (req.decoded.roleId === 1) {
      return Document.findAndCountAll({
        limit,
        offset,
        where: {
          access: {
            $ne: 'private'
          },
          title: {
            $like: `%${queryString}%`
          }
        },
        include: [
          {
            model: User,
            attributes: ['userName', 'roleId']
          }
        ]
      })
      .then(({ rows: document, count }) => {
        if (count === 0) {
          return res.status(404).json({
            message: 'Document not found'
          });
        }
        res.status(200).send({
          document,
          pagination: metaData(count, limit, offset),
        });
      })
      .catch(error => res.status(400).send(error));
    } else if (req.decoded.roleId !== 1) {
      return Document.findAndCountAll({
        limit,
        offset,
        include: [
          {
            model: User,
            attributes: ['userName', 'roleId'],
            where: {
              roleId: req.decoded.roleId
            },
          },
        ],
        where: {
          access: {
            $ne: 'private'
          },
          title: {
            $like: `%${queryString}%`
          }
        },

      })
      .then(({ rows: document, count }) => {
        if (count === 0) {
          return res.status(404).json({
            message: 'Document not found'
          });
        }
        res.status(200).send({
          document,
          pagination: metaData(count, limit, offset),
        });
      })
      .catch(error => res.status(400).send(error));
    }
  }
};
