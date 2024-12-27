import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

function MessagesCalendar() {
  const [date, setDate] = useState(new Date());
  const [messages, setMessages] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]);

  useEffect(() => {
    // Nachrichten abrufen, wenn das Datum geändert wird
    const fetchMessages = async () => {
      try {
        const formattedDate = date.toISOString().split('T')[0];
        const response = await axios.get(`http://localhost:5000/messages?date=${formattedDate}`);
        setSelectedMessages(response.data);
      } catch (error) {
        console.error('Fehler beim Abrufen der Nachrichten:', error);
      }
    };

    fetchMessages();
  }, [date]);

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h1>Willkommen bei Daily Love Notes!</h1>
      <p>Wähle ein Datum aus, um die Nachrichten zu sehen:</p>
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={({ date, view }) => {
          const formattedDate = date.toISOString().split('T')[0];
          return messages.some(msg => msg.date === formattedDate) ? 'highlight' : null;
        }}
      />
      <div style={{ marginTop: '20px' }}>
        <h2>Nachrichten für {date.toLocaleDateString()}</h2>
        {selectedMessages.length > 0 ? (
          <ul>
            {selectedMessages.map((msg, index) => (
              <li key={index}>
                <p><strong>{msg.name}</strong>: {msg.message}</p>
                {msg.imageUrl && <img src={msg.imageUrl} alt="Bild" style={{ maxWidth: '200px', marginTop: '10px' }} />}
              </li>
            ))}
          </ul>
        ) : (
          <p>Keine Nachrichten für dieses Datum.</p>
        )}
      </div>
    </div>
  );
}

export default MessagesCalendar;
