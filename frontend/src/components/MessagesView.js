import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MessagesView = () => {
  const { date } = useParams(); // Das Datum aus der URL
  const [message, setMessage] = useState(null); // Ein einzelnes Objekt
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Nachricht für das ausgewählte Datum laden
    const fetchMessage = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching message for date:', date); // Debug-Log
        const response = await axios.get(`https://daily-love-notes-backend.onrender.com/messages?date=${date}`);
        console.log('API response:', response.data); // Debug-Log
        setMessage(response.data); // API-Response wird als einzelnes Objekt gespeichert
      } catch (error) {
        console.error('Fehler beim Laden der Nachricht:', error);
        setError('Fehler beim Laden der Nachricht.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [date]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Nachricht für {date}</h1>
      {loading && <p>Lädt...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && message ? ( // Wenn eine Nachricht existiert
        <p>{message.message}</p>
      ) : (
        !loading && !error && <p>Keine Nachrichten für dieses Datum.</p>
      )}
    </div>
  );
};

export default MessagesView;
 
