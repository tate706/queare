import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import VCardCreator from './components/VCardCreator';
import QRCodeCreator from './components/QRCodeCreator';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create/vcard" element={<VCardCreator />} />
          <Route path="/create/qr" element={<QRCodeCreator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;