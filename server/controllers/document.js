const models = require('../models');
const paginationHelper = require('../helpers/helper.js');
const responseHelper = require('../helpers/helper').responseHelper;

const Document = models.Document;
const User = models.User;
const pagination = paginationHelper.paginationMetaData;


module.exports = {
  /**
   *
   * create documents for users
   * @param {object} req - document to be created
   * @param {object} res - created document
   * @returns {object} - created document
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

  //
  /**
   * update a single document for the user
   *
   * @param {number} req - requested id of the document to be updated
   * @param {object} res - object of the updated document
   * @returns {object} - updated document
   */
  updateDocument(req, res) {
    if (isNaN(req.params.id)) {
      return res.status(400);
    }
    const queryId = Number(req.params.id);
    return Document.findById(queryId)
      .then((document) => {
        if (!document) {
          return responseHelper(res);
        }
        if (Number(document.userId) !== Number(req.decoded.id)) {
          return res.status(401).json({
            message: 'You are not authorized to update this document'
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

  /**
   * find a document by Id
   *
   * @param {number} req - id of the requested document
   * @param {object} res - object containg the requested document
   * @returns {object} requested document
   */
  findDocument(req, res) {
    return Document.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return responseHelper(res);
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
  /**
   *
   *Delete a document by Id
   * @param {number} req - id of the requested document
   * @param {object} res - message
   * @returns {object} - message
   */
  deleteDocument(req, res) {
    return Document.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return responseHelper(res);
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
          .then(() => res.status(204)
            .send({ message: 'Document deleted successfully' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  /**
   *  get all documents
   * @param {object} req - contains an object of the query, limits and offset
   * @param {array} res - array of documents with pagination
   * @returns {array} - array of documents
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
          pagination: pagination(count, limit, offset),
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
          pagination: pagination(count, limit, offset),
        });
      })
      .catch(error => res.status(400).send(error));
    }
  },

  /**
   *
   * Get documents for specific user
   * @param {object} req - request object containing limit query and offset
   * @param {array} res - array of documents for the requested user
   * @return {array} - array of requested user's document
   */
  getSpecificUserDocuments(req, res) {
    const limit = req.query.limit || 6;
    const offset = req.query.offset || 0;
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
              pagination: pagination(count, limit, offset),
            });
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  /**
   *
   * Search for documents by title
   * @param {string} req - an object containing the query, offset and limit
   * @param {array} res - an array containing searched document
   * @returns {array} - searched document
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
            $like: new RegExp(`%${queryString}%`, 'i')
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
          return responseHelper(res);
        }
        res.status(200).send({
          document,
          pagination: pagination(count, limit, offset),
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
          return responseHelper(res);
        }
        res.status(200).send({
          document,
          pagination: pagination(count, limit, offset),
        });
      })
      .catch(error => res.status(400).send(error));
    }
  }
};
