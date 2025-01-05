import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MessagesView = ({ date }) => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        console.log(`Fetching message for date: ${date}`);
        const response = await axios.get(`https://daily-love-notes-backend.onrender.com/messages?date=${date}`);
        if (response.data && response.data.message) {
          console.log('API response:', response.data);
          setMessage(response.data.message);
          setError(null); // Reset any previous error
        } else {
          console.log('No message found for this date.');
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message ? (
        <p>{message}</p>
      ) : (
        !error && <p>Keine Nachrichten für dieses Datum.</p>
      )}
    </div>
  );
};

export default MessagesView;
