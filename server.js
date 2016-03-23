var express = require('express'),
    pg      = require('pg');

var app = express();

app.use(express.static('public'));

app.get('/series.json', function (req, res) {
  // SELECT DISTINCT entryName FROM ranks
  res.send('{"hello":"world"}');
});

app.listen(process.env.PORT);
