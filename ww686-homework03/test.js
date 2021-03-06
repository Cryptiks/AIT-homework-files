// test.js

var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});

var app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
  var properties = [];
  for (var property in req.headers) {
    properties.push(property + ": "+ req.headers[property]);
  }
  res.render('home', {headers : properties});
});
app.get('/about', function(req, res) {
  res.render('about');
});

app.use(express.static(__dirname + '/public'));

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
