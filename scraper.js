var http = require("http"),
    pg = require("pg");

http.get({
  host: "games-ak.espn.go.com",
  path: "/tournament-challenge-bracket/2016/en/api/v4/group?groupID=617947&length=26"
}, function (response) {
  var body = "";
  response.on("data", function (data) { body += data; });
  response.on("end", function () {
    var x = Math.floor(Date.now() / 1000);
    var entries = JSON.parse(body).group.entries.map(function (entry) {
      return { x: x, y: entry.rank, entryName: entry.entryName }
    });
    console.log(entries);
  });
});
