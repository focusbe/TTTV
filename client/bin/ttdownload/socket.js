const io = require('socket.io')(6801);
io.on('connection', function (socket) {
    console.log('connection');
    socket.on('message', function (name, data) {
        console.log(data);
    });
});
