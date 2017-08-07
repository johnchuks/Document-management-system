const logger = require('morgan');
const path = require('path');
const webpack = require('webpack');
const express = require('express');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../../webpack.config');
const app = require('./app');
const models = require('../models/');

const compiler = webpack(config);
app.use(logger('dev'));

const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'development';

app.use(express.static(`${__dirname}/../../client/app/public`));
if (env === 'development') {
  app.use(webpackMiddleware(compiler));
  app.use(webpackHotMiddleware(compiler));
}
app.set('jwtSecret', process.env.JWTSECRET);


app.listen(port, () => {
  models.sequelize.sync();
  console.log(`server is listening on port ${port}`);
});

require('../routes/route')(app);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/app', 'index.html'));
});


module.exports = app;

