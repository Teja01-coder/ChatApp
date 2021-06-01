const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const {generateMessage,generatelocationMessage} = require("./utils/message");
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
const express = require("express");
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
app.use(express.static(publicPath));







io.on('connection', function(socket) {
  console.log(" A new user just Connected");


  socket.emit('newMessage',generateMessage("Admin","Welcome to Teja's Chat Box"));


  socket.broadcast.emit('newMessage',generateMessage("Admin","A New User Joined"));



  socket.on('createMessage', function(message,callback) {
    console.log('createMessage', message);

       io.emit("newMessage",generateMessage(message.from,message.text));
       callback("This piece of text is from the Server");
    });

    socket.on('createLocationMessage',function(coords){
      io.emit('newLocationMessage',generatelocationMessage("Admin",coords.lat,coords. lng))
    })


  socket.on('disconnect', function() {
    console.log("the user is disconnected");
  });
});




server.listen(port, function() {
  console.log("the server is live");
})
