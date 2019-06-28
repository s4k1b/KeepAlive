window.onload = function() {

  // Get references to elements on the page.
  var form = document.getElementById('message-form');
  var messageField = document.getElementById('message');
  var messagesList = document.getElementById('messages');
  var socketStatus = document.getElementById('status');
  var closeBtn = document.getElementById('close');

  // The rest of the code in this tutorial will go here...
  var socket = new WebSocket ('ws://echo.websocket.org');

  // show a connected mesage when websocket is opened;
  socket.onopen = function(event) {
    socketStatus.innerHTML = "Connected to: " + event.currentTarget.url;
    socketStatus.className = "open";
  }

  // log errors
  socket.onerror = function(error) {
    console.log("WebSocket Error : " + error);
  }

  // sending message when the form in submitted
  form.onsubmit = function(e) {
    e.preventDefault();

    // Retrieve message from the text box
    const message = messageField.value;

    // send message through WebSocket
    socket.send(message);

    //add the message the message list
    messagesList.innerHTML += `<li class="sent"><span>Sent:</span>${message}</li>`;

    //clear the message box
    messageField.value = "";
  }

  // receiving message from the server
  socket.onmessage = function(event) {
    const message = event.data;
    messagesList.innerHTML += `<li class="received"><span>Received:</span>${message}</li>`;
  }

  // when the connection closes
  socket.onclose = function(event) {
    socketStatus.innerHTML = "Disconnected from WebSocket.";
    socketStatus.className = "closed";
  }

  // close the connection
  closeBtn.onclick = function(e) {
    e.preventDefault();

    // close the websocket
    socket.close();

    return false;
  }
};