import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MessagesView = ({ date }) => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        console.log(`Fetching message for date: ${date}`); // Debugging-Ausgabe
        const response = await axios.get(`https://daily-love-notes-backend.onrender.com/messages?date=${date}`);
        console.log('API response:', response.data); // Debugging-Ausgabe

        if (response.data && response.data.message) {
          setMessage(response.data.message);
          setError(null); // Fehler zurücksetzen
        } else {
          setMessage(null);
          setError('Keine Nachrichten gefunden.');
        }
      } catch (err) {
        console.error('Error fetching message:', err);
        setMessage(null);
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
