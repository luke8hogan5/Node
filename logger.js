const EventEmitter = require('Node/Events');

class Logger extends EventEmitter{
    log(msg){
        this.emit('message', {msg:msg})
    }
}

module.exports = Logger;