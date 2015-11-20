// app.js

var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var path = require("path");
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

var publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

app.use(bodyParser.urlencoded({ extended: false }));

var sessionOptions = {
	secret: 'secret cookie thang',
	resave: true,
	saveUninitialized: true
};
app.use(session(sessionOptions));

var listOfBirds = [new bird('Bald Eagle', 3), new bird('Yellow Billed Duck', 7), new bird('Great Cormorant', 4)];


function bird(name, quantity) {
  this.name = name;
  this.quantity = quantity;
}

app.use(function(req, res, next) {
  console.log(req.method, req.path);
  console.log("=====");
  console.log("req.body:", req.body);
  console.log("req.session.minVal:", req.session.minVal);
	next();
});

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/birds', function(req, res) {
  if (req.session.minVal) {
    res.render('birds', {birds: req.session.minValList});
  }
  else {
    res.render('birds', {birds: listOfBirds});
  }
});

app.get('/settings', function(req, res) {
  var preFill;
  if (req.session.minVal == undefined) {
    preFill = "";
  }
  else {
    preFill = req.session.minVal;
  }
  res.render('settings', {minVal: preFill});
});

app.post("/birds", function(req, res) {
  // reset the session if a new bird is added
  req.session.minVal = null;

  var birdName = req.body.birdName;
  var incremented = false;
  for (var i in listOfBirds) {
    if(listOfBirds[i].name === birdName) {
      listOfBirds[i].quantity += 1;
      incremented = true;
    }
  }
  if (!incremented) {
    listOfBirds.push(new bird(birdName, 1));
  }
  res.redirect('/birds');
});

app.post("/settings", function(req, res) {
  req.session.minVal = req.body.minVal;

  req.session.minValList = listOfBirds.filter(function(ele) {
		return ele.quantity >= req.session.minVal;
	});

  res.redirect('/birds');
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
