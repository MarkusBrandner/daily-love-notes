import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  // Funktion zum Formatieren des Datums in "YYYY-MM-DD" im lokalen Kontext
  const formatSelectedDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Wenn ein Datum im Kalender angeklickt wird
  const handleDateClick = (date) => {
    const formattedDate = formatSelectedDate(date);
    setSelectedDate(date);
    navigate(`/messages/${formattedDate}`);
  };

  // Funktion, um Tage in der Zukunft zu deaktivieren
  const disableFutureDates = ({ date, view }) => {
    if (view === 'month') { // Nur Tage im Monats-View überprüfen
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Uhrzeit auf Mitternacht setzen
      return date > today; // Tage in der Zukunft deaktivieren
    }
    return false; // Keine Einschränkung für Jahre oder Monate
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Kalender</h1>
      <Calendar
        onClickDay={handleDateClick}
        value={selectedDate}
        tileDisabled={disableFutureDates} // Funktion zum Deaktivieren von Tagen
      />
    </div>
  );
};

export default CalendarView;
