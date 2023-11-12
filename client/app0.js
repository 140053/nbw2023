const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve HTML for the client
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Listen for messages from the client
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);

    // Send a response back to the client
    ws.send(`Received: ${message}`);
  });

  // Handle disconnect
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
