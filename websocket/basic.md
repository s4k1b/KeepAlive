# Why WebSockets

- For bidirectional communication between Server and Client.
- Bidirectinal communication can be achieved using traditional HTTP connection by keeping it open until server has some data to push down to client. But the overhead of HTTP is high because everytime an HTTP request is made, a bunch of headers and cookies data are sent to the server which is sometimes unnecessary and increases latency.
- WebSockets provide a of creating persistent, low latency connection that can support transaction initiated by either client or server.

# How does it work

- WebSocket connections are established by a handshake between the server and client
- At first the client sends a HTTP request to the server with an `Upgrade` header. This header informs the server that the client is trying to establish a WebSocket connection.

  Simple example: 

  ```
  GET ws://websocket.example.com/ HTTP/1.1
  Origin: http://example.com
  Connection: Upgrade
  Host: websocket.example.com
  Upgrade: websocket
  ```

  here, `ws` is used instead of `http`. We can also use `wss` which is similar to `https`.
- If the server supports the websocket protocol, it agrees to the upgrade and communicates through an `Upgrade` header in the response.

  ```
  HTTP/1.1 101 WebSocket Protocol Handshake
  Date: Wed, 16 Oct 2013 10:07:34 GMT
  Connection: Upgrade
  Upgrade: WebSocket
  ```

- When the handshake is completed, the initial HTTP connection is replaced by a WebSocket connection that uses the same underlying TCP/IP connection.
- When connection is established, the communication is done by sending messages divided into frames, each frame is prefixed by a information header.
- Messages can reconstructed when all the frames have arrived.

# Opening Connections

- WebSocket connection is created by calling a `WebSocket` constructor and passing the `url` of the server.

  ```
  // Create a new WebSocket.
  var socket = new WebSocket('ws://echo.websocket.org');
  ```

- When the connection is established, an `open` event is fired on the `WebSocket` instance.
- We can listen to the `open` event using an `eventListener` called `onopen` and respond to it by passing a `callback` function.

  ```
  // Show a connected message when the WebSocket is opened.
  socket.onopen = function(event) {
    socketStatus.innerHTML = 'Connected to: ' + event.currentTarget.url;
    socketStatus.className = 'open';
  };
  ```

# Handling Errors

- Errors can be handled by listening to the `error` event.

  ```
  // log errors
  socket.onerror = function(error) {
    console.log("WebSocket Error : " + error);
  }
  ```

# Sending Messages

- Messages can be sent through the websocket by envoking the `send()` method of the `WebSocket` instance and pass the message as a parameter.

  ```
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
  ```

# Receiving Messages

- Messages from server can be received by listening to the `message` event.
- The message is inside the `data` property of event.

  ```
  // receiving message from the server
  socket.onmessage = function(event) {
    const message = event.data;
    messagesList.innerHTML += `<li class="received"><span>Received:</span>${message}</li>`;
  }
  ```

# Closing Connections

- Connection can be closed by calling the `close()` method of the `WebSocket` instance.

  ```
  // close the connection
  closeBtn.onclick = function(e) {
    e.preventDefault();

    // close the websocket
    socket.close();

    return false;
  }
  ```

- It fires a `close` method, which we can listen to do any cleanup work after the connection is closed.

  ```
  // when the connection closes
  socket.onclose = function(event) {
    socketStatus.innerHTML = "Disconnected from WebSocket.";
    socketStatus.className = "closed";
  }
  ```
