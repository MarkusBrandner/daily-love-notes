import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Messages = () => {
  const { date } = useParams(); // Datum aus der URL
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      console.log(`Lade Nachricht für Datum: ${date}`); // Debugging

      try {
        const response = await fetch(`https://markusbrandner.github.io/daily-love-notes/api/messages/${date}`, {
          mode: 'cors', // Sicherheitshalber
        });

        if (!response.ok) {
          throw new Error(`Fehler: ${response.status}`);
        }

        const data = await response.json();
        console.log('API-Daten:', data); // Debugging

        if (data && data.message) {
          console.log('Setze Nachricht:', data.message);
          setMessage(data.message);
        } else {
          console.log('Keine Nachricht gefunden.');
          setMessage('Keine Nachrichten für dieses Datum.');
        }
      } catch (err) {
        console.error('Fehler beim Abrufen der Nachricht:', err);
        setError('Fehler beim Abrufen der Nachricht.');
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
