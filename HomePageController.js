var http = require('http');
var https = require('https');

var url = require('url');
var fs = require('fs');
var event = require('events');
var path = require('path');
var eventEmitter = new event.EventEmitter();
var express = require('express'); // Express Form Handling
var mongo = require('mongodb');

const MongoClient = require('./DatabaseConnect');

http.createServer(function (req,res){

      var q = url.parse(req.url, true);
      var filename = "." + q.pathname;

      fs.readFile(filename, function(err, data) {
        if (err) {
      //  res.writeHead(404, {'Content-Type': 'text/html'});
          return res.end("404 Not Found");
        }
        //res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      });

        let championList = MongoClient.findChampions();
        console.log(championList);

}).listen(8080);

//euw1.api.riotgames.com
//europe.api.riotgames.com

https.get('https://euw1.api.riotgames.com/?api_key=RGAPI-ee2b1c83-9865-488f-b62a-681e865842e5', (resp) => {

  console.log('statusCode:',resp.statusCode);
  console.log('headers:',resp.headers);

  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});