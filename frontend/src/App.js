import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import CalendarView from './components/CalendarView';
import MessagesView from './components/MessagesView';
import AdminPage from './components/AdminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CalendarView />} />
        <Route path="/messages/:date" element={<MessagesView />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
