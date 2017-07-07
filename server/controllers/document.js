const Sequelize = require("sequelize");
const models = require("../models");

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
        title: "This Field is Required"
      });
    }
    if (!req.body.content) {
      return res.status(401).json({
        content: "This Field is Required"
      });
    }
    if (!req.body.value) {
      return res.status(401).json({
        value: "This Field is Required"
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
      .then(documentResponse => res.status(200).send(documentResponse))
      .catch(error => res.status(400).send(error));
      } else {
        return res.status(403).json({
          title: 'Document already exists'
        });
      }
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
    return Document.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: "Document Not Found"
          });
        }
        if (
          req.decoded.roleId !== 1 &&
          Number(document.userId) !== Number(req.decoded.id)
        ) {
          return res.status(403).json({
            message: "You are not authorized to delete this document"
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
          return res.status(400).json({
            success: false,
            message: 'Document not found'
          });
        }
        if (document.access === 'public') {
          return res.status(200).send(document);
        }
        if (document.access === 'private') {
          if (document.userId !== req.decoded.id) {
            return res.status(403).json({
              message: 'You are not authorized to view this document'
            });
          }
          return res.status(200).send(document);
        }
        if (document.access === "role") {
          return models.User
            .findById(document.userId)
            .then((documentOwner) => {
              if (
                req.decoded.roleId !== 1 &&
                Number(documentOwner.roleId) !== Number(req.decoded.roleId)
              ) {
                return res.status(401).json({
                  success: false,
                  message: "You are not authorized to view this document"
                });
              }
              return res.status(200).send(document);
            })
            .catch(error => res.status(404).send(error));
        }
      })
      .catch(error => res.status(404).send(error));
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
            message: "Document Not Found"
          });
        }
        if (
          req.decoded.roleId !== 1 &&
          Number(document.userId) !== Number(req.decoded.id)
        ) {
          return res.status(403).json({
            message: "You are not authorized to delete this document"
          });
        }
        return document
          .destroy()
          .then(() => res.status(200).send())
          .catch(error => res.status(404).send(error));
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
            $ne: "private"
          }
        },
        include: [
          {
            model: User,
            attributes: ["userName", "roleId"]
          }
        ]
      })
      .then((document) => {
        const pagination = {
          totalCount: document.count,
          pageCount: Math.ceil(document.count / limit),
          page: Math.floor(offset / limit) + 1,
          pageSize: document.rows.length
        };
        res.status(200).send({
          document: document.rows,
          pagination,
          offset,
          limit
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
            attributes: ["userName", "roleId"],
            where: {
              roleId: req.decoded.roleId
            },
          },
        ],
        where: {
          access: {
            $ne: "private"
          }
        },

      })
      .then((document) => {
        const pagination = {
          totalCount: document.count,
          pageCount: Math.ceil(document.count / limit),
          page: Math.floor(offset / limit) + 1,
          pageSize: document.rows.length
        };
        res.status(200).send({
          document: document.rows,
          pagination,
          offset,
          limit
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
          return res.status(400).json({
            message: "User not found"
          });
        }
        return Document.findAndCountAll({
          limit,
          offset,
          where: {
            userId: user.id
          }
        })
          .then((document) => {
            const pagination = {
              totalCount: document.count,
              pageCount: Math.ceil(document.count / limit),
              page: Math.floor(offset / limit) + 1,
              pageSize: document.rows.length
            };
            res.status(200).send({
              document: document.rows,
              pagination
            });
          })
          .catch(error => res.status(404).send(error));
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
    const queryString = req.query.q;
    if (!queryString) {
      return res.status(400).json({
        message: "Invalid search input"
      });
    }
    return Document.findAndCountAll({
      where: {
        title: {
          $like: `%${queryString}%`
        },
        access: {
          $ne: "private"
        }
      },
      include: [
        {
          model: User,
          attributes: ["roleId"]
        }
      ]
    })
      .then((document) => {
        if (document.count === 0) {
          return res.status(404).json({
            message: 'Document not found'
          });
        }
        res.status(200).send(document);
      })
      .catch(error => res.status(400).send(error));
  }
};
