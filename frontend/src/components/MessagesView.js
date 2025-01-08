import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Messages = () => {
  const { date } = useParams(); // Datum aus der URL
  const [message, setMessage] = useState(null); // Nachricht für das Datum
  const [loading, setLoading] = useState(true); // Ladevorgang
  const [error, setError] = useState(null); // Fehlerstatus

  useEffect(() => {
    const fetchMessage = async () => {
      console.log(`Lade Nachricht für Datum: ${date}`); // Debugging: Aktuelles Datum

      try {
        // API-URL, passe sie an, falls nötig
        const response = await fetch('http://localhost:3000/data/messages.json');

        // Überprüfen, ob die Antwort erfolgreich ist
        if (!response.ok) {
          throw new Error(`Fehler beim Abrufen der Daten: ${response.status}`);
        }

        const data = await response.json();
        console.log('API-Daten:', data); // Debugging: Die gesamte JSON-Antwort

        // Nachricht für das aktuelle Datum extrahieren
        if (data[date] && data[date].message) {
          console.log('Setze Nachricht:', data[date].message); // Debugging: Gefundene Nachricht
          setMessage(data[date].message);
        } else {
          console.log('Keine Nachricht für dieses Datum gefunden.');
          setMessage('Keine Nachrichten für dieses Datum.');
        }
      } catch (err) {
        console.error('Fehler beim Abrufen der Nachricht:', err); // Debugging: Fehlerbeschreibung
        setError('Fehler beim Abrufen der Nachricht.');
      } finally {
        setLoading(false); // Ladezustand abschließen
        console.log('Ladevorgang abgeschlossen.'); // Debugging
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
