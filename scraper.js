var http  = require('http'),
    pg    = require('pg'),
    redis = require('redis');

http.get({
  host: 'games-ak.espn.go.com',
  path: '/tournament-challenge-bracket/2016/en/api/v4/group?groupID=617947&length=26'
}, function (response) {
  var body = '';
  response.on('data', function (data) { body += data; });
  response.on('end', function () {

    var redisClient = redis.createClient(process.env.REDIS_URL);
    redisClient.get('body', function (err, reply) {
      if (body !== reply) {
        redisClient.set('body', body);

        pg.connect(process.env.DATABASE_URL, function (err, pgClient, done) {

          var x = Math.floor(Date.now() / 1000), completed = 0;

          JSON.parse(body).group.entries.forEach(function (entry) {
            console.log(pgClient);
            pgClient.query('INSERT INTO ranks (entryName, x, y) VALUES ($1, $2, $3)', [
              entry.entryName, x, entry.rank
            ], function (err, result) {
              if (++completed === 26) done();
            });
          });
        });
      }
    });
  });
});
