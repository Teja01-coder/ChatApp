const path = require("path");
const http=require("http");
const socketIO=require("socket.io");
const publicPath=path.join(__dirname,'/../public');
const port=process.env.PORT || 3000 ;
const express=require("express");
let app=express();
let server=http.createServer(app);
let io=socketIO(server);
app.use(express.static(publicPath));







io.on('connection',function(socket){
  console.log(" A new user just Connected");

  socket.on('disconnect',function(){
    console.log("the user is disconnected");
  });
});




server.listen(port,function(){
  console.log("the server is live");
})
