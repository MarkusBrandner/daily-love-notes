// Import modules
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5000;

// Define allowed CORS origin
const corsOptions = {
  origin: 'https://markusbrandner.github.io',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Route to fetch messages
app.get('/messages', (req, res) => {
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ error: 'Date parameter is required' });
  }

  fs.readFile('messages.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading messages.json:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    try {
      const messages = JSON.parse(data);
      const filteredMessages = messages.filter(msg => msg.date === date);
      
      if (filteredMessages.length === 0) {
        return res.status(404).json({ error: 'No messages found for the given date' });
      }

      res.json(filteredMessages);
    } catch (parseError) {
      console.error('Error parsing messages.json:', parseError);
      return res.status(500).json({ error: 'Invalid JSON format in messages.json' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
