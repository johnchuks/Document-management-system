const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../routes/route');


const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));



routes(app);

module.exports = app;
