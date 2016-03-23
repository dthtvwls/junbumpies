var express = require("express"),
    pg = require("pg");

var app = express();

app.use(express.static("public"));

app.listen(process.env.PORT || 8080);
