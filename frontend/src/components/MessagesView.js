import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MessagesView = () => {
  const { date } = useParams(); // Das Datum aus der URL
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Nachrichten für das ausgewählte Datum laden
    const fetchMessages = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching messages for date:', date); // Debug-Log
        const response = await axios.get(`https://daily-love-notes-backend.onrender.com/messages?date=${date}`);
        console.log('API response:', response.data); // Debug-Log
        setMessages(response.data);
      } catch (error) {
        console.error('Fehler beim Laden der Nachrichten:', error);
        setError('Fehler beim Laden der Nachrichten.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [date]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Nachrichten für {date}</h1>
      {loading && <p>Lädt...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && messages.length > 0 ? (
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg.message}</li>
          ))}
        </ul>
      ) : (
        !loading && !error && <p>Keine Nachrichten für dieses Datum.</p>
      )}
    </div>
  );
};

export default MessagesView;
