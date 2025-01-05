// Importing required modules
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// API endpoint to fetch messages by date
app.get('/messages', (req, res) => {
    const date = req.query.date;

    if (!date) {
        return res.status(400).json({ error: 'Date query parameter is required' });
    }

    // Adjusted file path to locate messages.json in backend/data
    const filePath = path.join(__dirname, 'data', 'messages.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading messages.json:', err);
            return res.status(500).json({ error: 'Failed to read messages file' });
        }

        try {
            const messages = JSON.parse(data);

            if (!Array.isArray(messages)) {
                throw new Error('Invalid messages format in JSON file');
            }

            const messageForDate = messages.find(msg => msg.date === date);

            if (!messageForDate) {
                return res.status(404).json({ message: 'No messages found for this date' });
            }

            res.json(messageForDate);
        } catch (parseError) {
            console.error('Error parsing messages.json:', parseError);
            res.status(500).json({ error: 'Failed to parse messages file' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
