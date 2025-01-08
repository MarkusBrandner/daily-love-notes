import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Messages = () => {
  const { date } = useParams(); // Datum aus der URL
  const [message, setMessage] = useState(null); // Nachricht
  const [loading, setLoading] = useState(true); // Ladevorgang
  const [error, setError] = useState(null); // Fehler

  useEffect(() => {
    const fetchMessage = async () => {
      console.log(`Lade Nachricht für Datum: ${date}`); // Debugging: Datum aus URL

      try {
        // URL zur zentralen messages.json
        const response = await fetch(
          'https://markusbrandner.github.io/daily-love-notes/api/messages.json'
        );

        // Überprüfen, ob die Antwort erfolgreich ist
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
