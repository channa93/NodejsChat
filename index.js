var app = require('express')();
var http = require('http').Server(app); // initialize app to be a handler for supploy HTTP server
var io = require('socket.io')(http);  // io : is server

// define route handler
app.get('/', function (req, res) {   
	//res.send('<h1> Hello word </h1>');  // send with HTML string
	res.sendFile(__dirname + '/view/index.html');  // send HTML file
});


// socket listen on connection event
io.on('connection', function(socket) { // socket: is client
	//TODO: Broadcast a message to connected users when someone connects or disconnects    ********DONE
	//TODO: Add support for nicknames
	//TODO: Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
	//TODO: Add “{user} is typing” functionality
	//TODO: Show who’s online
	//TODO: Add private messaging
	//TODO: Share your improvements!

	io.emit('notifyConnectedUsers', 'a user connected');
	console.log('a user connected');

	socket.on('sendMessage', function(message) {
		console.log(message);
			// Broadcast message to everyone including sender
		io.emit('sendMessage', message); 

			// Broadcast message to everyone exclude the sender
		//socket.broadcast.emit('sendMessage', message);
	});
		
		//Each socket also fires a special disconnect event. This will fire when we disconnect. i.e: refresh browser
	socket.on('disconnect', function() {
		console.log('a user disconnected');
		io.emit('notifyConnectedUsers', 'a user disconnected');
	});

	
});


// make http server listen on port 3000
http.listen(3000, function() {    	
	console.log('server is listening on port 3000');
});