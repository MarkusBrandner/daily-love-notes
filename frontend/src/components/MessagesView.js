import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MessagesView = () => {
  const { date } = useParams(); // Das Datum aus der URL
  const [message, setMessage] = useState(null); // Ein einzelnes Objekt
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessage = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching message for date:', date); // Debug-Log
        const response = await axios.get(`https://daily-love-notes-backend.onrender.com/messages?date=${date}`);
        console.log('API response:', response.data); // Debug-Log
        setMessage(response.data); // Speichert die API-Daten im State
      } catch (error) {
        console.error('Fehler beim Laden der Nachricht:', error);
        setError('Fehler beim Laden der Nachricht.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [date]);

  console.log('Rendering with message:', message); // Debug-Log

  return (
    <div style={{ padding: '20px' }}>
      <h1>Nachricht für {date}</h1>
      {loading && <p>Lädt...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && message.message ? ( // Prüfen, ob `message` und `message.message` existieren
        <p>{message.message}</p>
      ) : (
        !loading && !error && <p>Keine Nachrichten für dieses Datum.</p>
      )}
    </div>
  );
};

export default MessagesView;
