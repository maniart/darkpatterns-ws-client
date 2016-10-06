// Connect to server
var io = require('socket.io-client');
var gamepad = require('gamepad');
var socket = io.connect('http://localhost:2323', {reconnect: true});

// Initialize `gamepad` library
gamepad.init();

// Create a game loop and poll for events
setInterval(gamepad.processEvents, 16);

// Scan for new gamepads as a slower rate
setInterval(gamepad.detectDevices, 500);


// Add a connect listener
socket.on('connect', function() {
  console.log('WS CLIENT: Connected!');

  // Listen for move events on all gamepads
  gamepad.on('move', function(id, axis, value) {
    var cmd = {
      id: id,
      axis: axis,
      value: value,
      name: 'move'
    };
    socket.emit('move', cmd, function(err) {
      console.log('___ error in WS: ', err);
    });
    console.log(cmd);
  });

  // Listen for button up events on all gamepads
  gamepad.on('up', function(id, num) {
    var cmd = {
      id: id,
      num: num,
      name: 'up'
    };
    socket.emit('up', cmd, function(err) {
      console.log('___ error in WS: ', err);
    });
    console.log(cmd);
  });

  // Listen for button down events on all gamepads
  gamepad.on('down', function(id, num) {
    const cmd = {
      id: id,
      num: num,
      name: 'down'
    };
    socket.emit('down', cmd, function(err) {
      console.log('___ error in WS: ', err);
    });
  });

});
