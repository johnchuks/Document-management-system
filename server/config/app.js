const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../routes/route');
const auth = require('../middlewares/authentication.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', auth.verifyJwtToken);

routes(app);

module.exports = app;
