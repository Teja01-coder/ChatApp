let socket = io();

socket.on("connect", function() {
  console.log("connected to the server");
});


socket.on("disconnect", function() {
  console.log("disconnected from the server");
});


socket.on("newMessage", function(message) {
  const template =document.querySelector('#message-template').innerHTML;
  const html = Mustache.render(template,{
    from:message.from,
    text:message.text,
    createdAt:formattedTime
  });
  const div = document.createElement("div");
  div.innerHTML=html
   document.querySelector('#messages').appendChild(div);

  const formattedTime = moment(message.createdAt).format('LT')
  console.log("newMessage", message);
  let li = document.createElement("li");
  li.innerText = `${message.from} ${formattedTime}:${message.text}`
  document.querySelector('#messages').appendChild(li);
});


socket.on("newLocationMessage", function(message) {

  console.log("newLocationMessage", message);
  const formattedTime = moment(message.createdAt).format('LT')
  let li = document.createElement("li");
  let a = document.createElement("a");
  li.innerText = `${message.from} ${formattedTime}:`
  a.setAttribute('target', "_blank");
  a.setAttribute('href', message.url);
  a.innerText = ('My Current Location');
  li.appendChild(a);
  document.querySelector('#messages').appendChild(li);
});


// socket.emit("createMessage",{
//   from:"lavanya",
//   text:"hey !"
//
// }, function(message){
//   console.log("got the message :", message);
// });

document.querySelector("#submit-btn").addEventListener('click', function(e) {
  e.preventDefault();
  socket.emit("createMessage", {
    from: "User",
    text: document.querySelector('input[name="message"]').value
  }, function() {


  });
});

document.querySelector("#send-location").addEventListener('click', function(e) {
  if (!navigator.geolocation) {
    return alert("geolocation is not supported by your browser");
  }
  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }, function() {
    alert("Unable TO Detect / fetch Your Location");
  })
});
