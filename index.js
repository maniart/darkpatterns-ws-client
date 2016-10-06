// Connect to server
var io = require('socket.io-client');
var socket = io.connect('http://localhost:2323', {reconnect: true});


// Add a connect listener
socket.on('connect', function(socket) {
  console.log('WS CLIENT: Connected!');
});
