const EventEmitter = require('Node/Events');

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();

//Event Listner
myEmitter.on('event', () => console.log("Event Fired"));

myEmitter.emit('event');