const Document = require('../models/').Document;

exports.createDocument = (req, res) => Document
    .create({
      title: req.body.title,
      content: req.body.content,
      access: req.body.access,
      userId: req.body.userId
    })
    .then(document => res.status(201).send(document))
    .catch(error => res.status(400).send(error));

exports.updateDocument = (req, res) => {
  Document.update({
    title: req.body.title,
    content: req.body.content,
    access: req.body.access
  })
}
