import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MessagesView = ({ date }) => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      console.log('Fetching message for date:', date); // Debugging
      try {
        const response = await axios.get(`https://daily-love-notes-backend.onrender.com/messages?date=${date}`);
        console.log('API response:', response.data); // Debugging
        if (response.data && response.data.message) {
          setMessage(response.data.message);
          setError(null); // Reset error if successful
        } else {
          setMessage(null);
        }
      } catch (err) {
        console.error('Error fetching message:', err);
        setMessage(null); // Reset message on error
        setError('Fehler beim Laden der Nachricht.');
      }
    };

    fetchMessage();
  }, [date]);

  useEffect(() => {
    console.log('Current message state:', message); // Debugging
    console.log('Current error state:', error); // Debugging
  }, [message, error]);

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
