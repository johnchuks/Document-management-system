const express = require('express');
const app = express();

const port = process.env.PORT || 8000;
const env = process.env.NODE_ENV || 'production';
app.use(express.static('public'));

app.listen(port, function () {
  console.log('server is listening on port ' + port);

});
