var express = require('express'),
    pg      = require('pg'),
    app     = express();

function color() {
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 16).toString(16);
  }
  return color;
}

app.use(express.static('public'));

app.get('/series.json', function (req, res) {
  pg.connect(process.env.DATABASE_URL, function (err, client, done) {
    client.query('SELECT DISTINCT name FROM ranks', function (err, names) {
      var json = [], completed = 0;
      names.rows.forEach(function (row) {
        client.query('SELECT x, y FROM ranks WHERE name = $1 ORDER BY x', [row.name], function (err, result) {
          json.push({ name: row.name, color: color(), data: result.rows.map(function (row) {
            // invert the y-axis so first place is on top
            return { x: row.x, y: names.rows.length - row.y };
          }) });
          if (++completed === names.rows.length) { done(); res.json(json); }
        });
      });
    });
  });
});

app.listen(process.env.PORT);
