// app.js

var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var path = require("path");

var app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

// require db.js
require("./db");
// require mongoose
var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');

// public files
var publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

app.get('/', function(req, res) {
  res.redirect('movies');
});

app.get('/movies', function(req, res) {
  if (req.query.director) {
    Movie.find({director: req.query.director}, function(err, movies, count) {
      res.render( 'movies', {'movies': movies});
    });
  }
  else {
    Movie.find(function(err, movies, count) {
      console.log(movies);
      res.render( 'movies', {'movies': movies});
    });
  }
});

    // 404 catch-all handler (middleware)
app.use(function(req, res, next){
  res.status(404);
  res.render('404');
});
    // 500 error handler (middleware)
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
console.log( 'Express started on http://localhost:' +
app.get('port') + '; press Ctrl-C to terminate.' );
});
