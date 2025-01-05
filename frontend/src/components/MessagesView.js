import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MessagesView = ({ date }) => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(`https://daily-love-notes-backend.onrender.com/messages?date=${date}`);
        if (response.data && response.data.message) {
          setMessage(response.data.message);
        } else {
          setMessage(null);
        }
      } catch (err) {
        console.error('Error fetching message:', err);
        setError('Fehler beim Laden der Nachricht.');
      }
    };

    fetchMessage();
  }, [date]);

  return (
    <div>
      <h1>Nachrichten für {date}</h1>
      {message !== null ? (
        <p>{message}</p>
      ) : (
        error ? <p style={{ color: 'red' }}>{error}</p> : <p>Keine Nachrichten für dieses Datum.</p>
      )}
    </div>
  );
};

export default MessagesView;
