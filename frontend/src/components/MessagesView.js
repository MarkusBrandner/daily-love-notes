import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MessagesView = () => {
  const { date } = useParams(); // Das Datum aus der URL
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Nachrichten für das ausgewählte Datum laden
   const fetchMessages = async () => {
  try {
    const response = await axios.get(`https://daily-love-notes-backend.onrender.com//messages?date=${date}`);
    setMessages(response.data);
  } catch (error) {
    console.error('Fehler beim Laden der Nachrichten:', error);
  }
};


    fetchMessages();
  }, [date]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Nachrichten für {date}</h1>
      {messages.length > 0 ? (
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg.message}</li>
          ))}
        </ul>
      ) : (
        <p>Keine Nachrichten für dieses Datum.</p>
      )}
    </div>
  );
};

export default MessagesView;
