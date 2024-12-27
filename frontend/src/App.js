import React from 'react';
<<<<<<< HEAD
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import CalendarView from './components/CalendarView';
import MessagesView from './components/MessagesView';
import AdminPage from './components/AdminPage';
=======
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CalendarView from './components/CalendarView';
import MessagesView from './components/MessagesView';
import AdminPage from './components/AdminPage'; // Import von AdminPage
>>>>>>> f05f5ee12265d09238675d97197d96a0dab58476

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CalendarView />} />
        <Route path="/messages/:date" element={<MessagesView />} />
<<<<<<< HEAD
        <Route path="/admin" element={<AdminPage />} />
=======
        <Route path="/admin" element={<AdminPage />} /> {/* Admin-Seite */}
>>>>>>> f05f5ee12265d09238675d97197d96a0dab58476
      </Routes>
    </Router>
  );
}

export default App;
