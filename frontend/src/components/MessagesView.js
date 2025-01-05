import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessagesView = ({ date }) => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!date) return;

        const fetchMessage = async () => {
            try {
                const response = await axios.get(`https://daily-love-notes-backend.onrender.com/messages?date=${date}`);
                
                if (response.data && response.data.message) {
                    setMessage(response.data.message);
                } else {
                    setMessage('Keine Nachrichten für dieses Datum.');
                }

                setError(''); // Clear any previous errors
            } catch (err) {
                console.error('Fehler beim Laden der Nachrichten:', err);
                setError('Fehler beim Laden der Nachrichten.');
                setMessage('');
            }
        };

        fetchMessage();
    }, [date]);

    return (
        <div>
            <h1>Nachrichten für {date}</h1>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <p>{message}</p>
            )}
        </div>
    );
};

export default MessagesView;
