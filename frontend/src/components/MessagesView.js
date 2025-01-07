import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Messages = () => {
  const { date } = useParams(); // Das Datum aus der URL holen
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Die API für das Datum abfragen
    const fetchMessage = async () => {
      try {
        const response = await fetch(`https://deine-api-url.com/messages/${date}`);
        if (!response.ok) {
          throw new Error('Fehler beim Abrufen der Daten');
        }
        const data = await response.json();

        // Überprüfen, ob eine Nachricht für das Datum vorhanden ist
        if (data.message) {
          setMessage(data.message);
        } else {
          setMessage('Keine Nachrichten für dieses Datum.');
        }
      } catch (err) {
        setError('Fehler beim Laden der Nachricht.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [date]);

  if (loading) {
    return <div>Lade Nachricht...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Nachrichten für {date}</h1>
      <p>{message}</p>
    </div>
  );
};

export default Messages;
