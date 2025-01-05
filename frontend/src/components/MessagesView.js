import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MessagesView = ({ date }) => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessage = async (retryCount = 0) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://daily-love-notes-backend.onrender.com/messages?date=${date}`);
      if (response.data && response.data.message) {
        setMessage(response.data.message);
      } else {
        setMessage(null);
      }
      setError(null);
    } catch (err) {
      if (retryCount < 3) {
        // Retry after 2 seconds
        setTimeout(() => fetchMessage(retryCount + 1), 2000);
      } else {
        console.error('Error fetching message:', err);
        setError('Fehler beim Laden der Nachricht.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, [date]);

  return (
    <div>
      <h1>Nachrichten für {date}</h1>
      {loading && <p>Laden...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message ? (
        <p>{message}</p>
      ) : (
        !loading && !error && <p>Keine Nachrichten für dieses Datum.</p>
      )}
    </div>
  );
};

export default MessagesView;
