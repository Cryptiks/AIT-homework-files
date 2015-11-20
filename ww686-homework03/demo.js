// demo.js

var http = require('http'),
fs = require('fs');

function serveStaticFile(res, path, contentType, responseCode) {
  if(!responseCode) responseCode = 200;
  fs.readFile(__dirname + path, function(err,data) {
    if(err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 - Internal Error');
    }
    else {
      // redirect
      if (responseCode === 301) {
        res.writeHead(responseCode,{'Location':'/about'});
        res.end();

      }
      else {
        res.writeHead(responseCode,{ 'Content-Type': contentType });
        res.end(data);
      }
    }
  });
}

http.createServer(function(req,res){
  var date = new Date().toLocaleString();
  var responseCode = 200;
  var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
  switch(path) {
    case '':
    case '/':
    case '/homepage':
      serveStaticFile(res, '/public/index.html', 'text/html'); break;
    case '/about':
      serveStaticFile(res, '/public/about.html', 'text/html'); break;
    case '/me':
      responseCode = 301;
      serveStaticFile(res, '/public/about.html', 'text/html', responseCode); break;
    case '/img/image1.png':
      serveStaticFile(res, '/public/img/image1.png', 'image/png'); break;
    case '/img/image2.png':
      serveStaticFile(res, '/public/img/image2.png', 'image/png'); break;
    case '/css/base.css':
      serveStaticFile(res, '/public/css/base.css', 'text/css'); break;
    default:
      responseCode = 404;
      serveStaticFile(res, '/public/404.html', 'text/html', responseCode); break;
  }
  console.log(date + ' ' + req.method + ' ' + req.url + ' ' + responseCode + ' ' + http.STATUS_CODES[responseCode]);
}).listen(3000);
