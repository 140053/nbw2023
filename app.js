const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const path = require('path');

// Serve static assets from the /assets directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Serve HTML for the sender and receiver
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/receiver', (req, res) => {
  res.sendFile(__dirname + '/receiver.html');
});
app.get('/spin', (req, res) => {
  res.sendFile(__dirname + '/spin.html');
});

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);

    // Send the message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000,'0.0.0.0', () => {
  console.log('Server is listening on port 3000');
});
