const path = require('path');
const ffi = require('ffi');
var xldl = path.join(__dirname, './bin/win32/xldl/XLDemo/bin/Release/XLDemo.exe');
const io = require('socket.io-client');
class Thunder {
    constructor() {
        const socket = io('http://127.0.0.1:6801', {

        });
        //console.log(socket);
        socket.on('connect', function () {
            console.log('connect');
        });

        socket.on('disconnect', function () {
            console.log('disconnect');
        });
        socket.send('test','data');
    }
}

var thunder = new Thunder();