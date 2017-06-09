const models = require('../models');

const Document = models.Document;

module.exports = {
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
};

// exports.updateDocument = (req, res) => {
//   Document.update({
//     title: req.body.title,
//     content: req.body.content,
//     access: req.body.access
//   })
// }
