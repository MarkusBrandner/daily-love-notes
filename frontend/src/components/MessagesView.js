import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Messages = () => {
  const { date } = useParams(); // Datum aus der URL
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      console.log(`Lade Nachricht für Datum: ${date}`); // Debugging: Datum aus URL

      try {
        // Passe die URL je nach Backend-Setup an
        const response = await fetch('http://localhost:3000/data/messages.json');

        if (!response.ok) {
          throw new Error(`Fehler beim Abrufen: ${response.status}`);
        }

        const data = await response.json();
        console.log('API-Daten:', data); // Debugging: API-Antwort prüfen

        // Nachricht für das Datum extrahieren
        if (data[date] && data[date].message) {
          console.log('Setze Nachricht:', data[date].message); // Debugging
          setMessage(data[date].message);
        } else {
          console.log('Keine Nachricht für dieses Datum gefunden.');
          setMessage('Keine Nachrichten für dieses Datum.');
        }
      } catch (err) {
        console.error('Fehler beim Abrufen der Nachricht:', err); // Debugging
        setError('Fehler beim Abrufen der Nachricht.');
      } finally {
        setLoading(false); // Ladevorgang abschließen
      }
    };

    fetchMessage();
  }, [date]);

  // Anzeige während des Ladens
  if (loading) {
    return <div>Lade Nachricht...</div>;
  }

  // Anzeige bei Fehlern
  if (error) {
    return <div>{error}</div>;
  }

  // Anzeige der Nachricht
  return (
    <div>
      <h1>Nachrichten für {date}</h1>
      <p>{message || 'Keine Nachricht gefunden.'}</p>
    </div>
  );
};

export default Messages;
