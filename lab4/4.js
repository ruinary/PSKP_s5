var http = require('http');
var url = require('url');
var fs = require('fs');
var data = require('./EventEmitter.js');
var port = 5000;

var db = new data.DB();

db.on('GET', (req, res) => {
  console.log('DB.GET');
  res.end(JSON.stringify(db.get()));
});
db.on('POST', (req, res) => {
  console.log('DB.POST');
  req.on('data', data => {
    let r = JSON.parse(data);
    db.post(r);
    console.log(r);
    res.end(JSON.stringify(r));
  });
});

db.on('DELETE', (req, res) => {
  console.log('DB.DELETE');
  req.on('data', data => {
    let r = JSON.parse(data);
    console.log();
    let deleteObj = db.delete(r.id);
    console.log(deleteObj);
    res.end(JSON.stringify(deleteObj));
  });
});

db.on('PUT', (req, res) => {
  console.log('DB.PUT');
  req.on('data', data => {
    let r = JSON.parse(data);
    db.put(r);
    console.log(r);
    res.end(JSON.stringify(r));
  });
});

http.createServer(function (request, response) {

  if (url.parse(request.url).pathname === '/') {
    let html = fs.readFileSync('./index.html');
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    response.end(html);

  } else if (url.parse(request.url).pathname === '/api/db') {
    db.emit(request.method, request, response);
  }
}).listen(5000);

console.log('Server running http://localhost:5000/');