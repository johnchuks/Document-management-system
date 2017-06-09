const express = require('express');

const logger = require('morgan');

const bodyParser = require('body-parser');

const app = express();
app.use(logger('dev'));

const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'development';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to document management',
}));

