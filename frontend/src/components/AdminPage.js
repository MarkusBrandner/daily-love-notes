import React, { useState } from 'react';
import axios from 'axios';

function AdminPage() {
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/messages', {
        token,
        date,
        message,
      });
      if (response.status === 201) {
        setSuccess(true);
        setDate('');
        setMessage('');
      }
    } catch (error) {
      console.error('Fehler beim Speichern der Nachricht:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Admin: Nachricht hinzufügen</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Datum:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nachricht:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Admin-Token:</label>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </div>
        <button type="submit">Nachricht speichern</button>
      </form>
      {success && <p>Nachricht wurde erfolgreich gespeichert!</p>}
    </div>
  );
}

export default AdminPage;
