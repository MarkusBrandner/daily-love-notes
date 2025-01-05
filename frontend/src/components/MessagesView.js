import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MessagesView = ({ date }) => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessage = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log(`Fetching message for date: ${date}`);
        const response = await axios.get(`https://daily-love-notes-backend.onrender.com/messages?date=${date}`);
        console.log('API response:', response.data);
        if (response.data && response.data.message) {
          setMessage(response.data.message);
        } else {
          setMessage(null);
        }
      } catch (err) {
        console.error('Error fetching message:', err);
        setError('Fehler beim Laden der Nachricht.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [date]);

  return (
    <div>
      <h1>Nachrichten für {date}</h1>
      {loading && <p>Lädt...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && message ? (
        <p>{message}</p>
      ) : (
        !loading && !error && <p>Keine Nachrichten für dieses Datum.</p>
      )}
    </div>
  );
};

export default MessagesView;
