const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
const express = require("express");
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
app.use(express.static(publicPath));







io.on('connection', function(socket) {
  console.log(" A new user just Connected");
  socket.emit('newMessage',{
    from:"Admin",
    text:"Welcome To Teja's Chat App",
    createDat:new Date().getTime()
  })

  socket.broadcast.emit('newMessage',{
    from:"Admin",
    text:"A New User Joined",
    createDat:new Date().getTime()
  })
  socket.emit("newMessage", {
    from: 'Lavanya',
    text: "hey it is my server chat"
  })

  socket.on('createMessage', function(message) {
    console.log('createMessage', message);

       io.emit("newMessage",{
         from:message.from,
        text:message.text,
        createDat:new Date().getTime()
       })



    });




  socket.on('disconnect', function() {
    console.log("the user is disconnected");
  });
});




server.listen(port, function() {
  console.log("the server is live");
})
