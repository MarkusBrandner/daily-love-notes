const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
const corsOptions = {
  origin: 'https://markusbrandner.github.io', // GitHub Pages URL
  methods: 'GET,POST',
};

app.use(cors(corsOptions));

app.use(express.json());

// File path
const dataFilePath = path.join(__dirname, 'data', 'messages.json');

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Daily Love Notes Backend!');
});

// Get messages by date
app.get('/messages', (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).send('Date is required');

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading data');

    const messages = JSON.parse(data);
    const filteredMessages = messages.filter((msg) => msg.date === date);
    res.json(filteredMessages);
  });
});

// Add a message
app.post('/messages', (req, res) => {
  const { token, date, message } = req.body;
  if (!token || !date || !message) return res.status(400).send('Invalid input');

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading data');

    const messages = JSON.parse(data);
    messages.push({ token, date, message });

    fs.writeFile(dataFilePath, JSON.stringify(messages, null, 2), (err) => {
      if (err) return res.status(500).send('Error saving data');
      res.status(201).send('Message added');
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
