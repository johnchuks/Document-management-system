const logger = require('morgan');
const path = require('path');
const webpack = require('webpack');
const express = require('express');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../../webpack.config');


const bodyParser = require('body-parser');

const app = express();
const compiler = webpack(config);
app.use(logger('dev'));

const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'development';

app.use(express.static(`${__dirname}/client/app/public`));
app.use(webpackMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));
app.set('jswtSecret', process.env.JWTSECRET);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

require('../routes/route')(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/app/index.html'));
});
// app.get('*', (req, res) => res.status(200).send({
//   message: 'Welcome to document management',
// }));
module.exports = app;

