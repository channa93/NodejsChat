var app = require('express')();
var http = require('http').Server(app); // initialize app to be a handler for supploy HTTP server
var io = require('socket.io')(http);

// define route handler
app.get('/', function (req, res) {   
	//res.send('<h1> Hello word </h1>');  // send with HTML string
	res.sendFile(__dirname + '/view/index.html');  // send HTML file
});


// socket listen on connection event
io.on('connection', function(socket) {

	socket.on('sendMessage', function(message) {
		console.log(message);
	});
		
		//Each socket also fires a special disconnect event. This will fire when we disconnect. i.e: refresh browser
	// socket.on('disconnect', function() {
	// 	console.log('user disconnected');
	// }) 
});


// make http server listen on port 3000
http.listen(3000, function() {    	
	console.log('server is listening on port 3000');
});