var http = require('http');
var url = require('url');
var fs = require('fs');
var event = require('events');
var path = require('path');
var eventEmitter = new event.EventEmitter();
const champObject = require('./championModel');
var express = require('express'); // Express Form Handling

http.createServer(function (req,res){

    let q = url.parse(req.url,true);

    let ekko = new champObject("Ekko", 23);

    let filePath = path.join(__dirname, '', req.url === '/' ? 'HomePageView.html' : req.url);
    console.log("File Path = " + filePath);

    let extName = path.extname(filePath);
    let contentType = 'text/html';

    switch(extName){
        case '.js' :
            contentType = 'text/javascript';
            break;
        case '.css' :
            contentType = 'text/css';
            break;
        case '.json' :
            contentType = 'application/json';
            break;
        case '.png' :
            contentType = 'image/png';
            break;
        case '.jpg' :
            contentType = 'image/jpg';
            break;
    }

    fs.readFile(filePath,(err, data) => {
        if(err){
            res.writeHead(404, {'Content-Type': 'text/html'}); // Fs.readFile() Error Page
            return  res.end("404 Not Found : " + filePath);
        }else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.write(ekko.name);

            let myEventHandler = function () {
                res.write("function fired");
            }
            eventEmitter.on("btnPress", myEventHandler);

            let listener1 = function listener1(){
                console.log("Button Fired");
            }
            eventEmitter.addListener("swapPage",listener1);
            eventEmitter.on("swapPage",listener1);
            eventEmitter.emit("swapPage");

            return res.end();
        }
    });
}).listen(8080);
