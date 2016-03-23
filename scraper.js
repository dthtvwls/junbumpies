var http  = require('http'),
    pg    = require('pg');

http.get({
  host: 'games-ak.espn.go.com',
  path: '/tournament-challenge-bracket/2016/en/api/v4/group?groupID=617947&length=26'
}, function (response) {
  var body = '';
  response.on('data', function (data) { body += data; });
  response.on('end', function () {
    var json = JSON.parse(body),
        x = Math.floor(json.lastProcessed / 1000),
        completed = 0;

    pg.connect(process.env.DATABASE_URL, function (err, pgClient, done) {
      json.group.entries.forEach(function (entry) {
        pgClient.query('INSERT INTO ranks (entryName, x, y) VALUES ($1, $2, $3)', [
          entry.entryName, x, entry.rank
        ], function (err, result) {
          if (++completed === 26) done();
        });
      });
    });
  });
});
