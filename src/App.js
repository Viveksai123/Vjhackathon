// src/App.js

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import FirstPage from './components/FirstPage';
import SecondPage from './components/SecondPage';
import TgspdcSecondPage from './components/TgspdcSecondPage';
import TwalletSecondPage from './components/TwalletSecondPage';
import GhmcSecondPage from './components/GhmcSecondPage';
import HmwssbSecondPage from './components/HmwssbSecondPage';
import EndowmentSecondPage from './components/EndowmentSecondPage';
import CmdaSecondPage from './components/CmdaSecondPage';
import PoliceSecondPage from './components/PoliceSecondPage';
import ContactUs from './components/ContactUs';
import RegisterModal from './components/RegisterModal';

function App() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [showModal, setShowModal] = useState(false);
  
  // Use location to check current route
  const location = useLocation();

  // Disable right-click
  useEffect(() => {
    const handleContextMenu = (event) => event.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  // Determine if the Register button should be displayed
  const showRegisterButton = location.pathname === "/";

  return (
    <div className="p-4">
      <div className="flex justify-end space-x-4 mb-4">
        {!isAuthenticated ? (
          <div className="flex flex-row justify-between items-center">
            <button
              onClick={() => loginWithRedirect()}
              className="bg-blue-500 text-white px-4 py-2 mr-5 rounded"
            >
              Log In
            </button>
            {showRegisterButton && ( // Only show Register button on FirstPage
              <button
                onClick={() => setShowModal(true)} // Open modal for registration
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Register
              </button>
            )}
          </div>
        ) : (
          showRegisterButton && ( // Register button available after login only on FirstPage
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Register
            </button>
          )
        )}
      </div>

      {/* Render Register Modal */}
      <RegisterModal showModal={showModal} setShowModal={setShowModal} />

      {/* Routes - all pages are accessible */}
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/second-page" element={<SecondPage />} />
        <Route path="/policesecond-page" element={<PoliceSecondPage />} />
        <Route path="/tgspdcsecond-page" element={<TgspdcSecondPage />} />
        <Route path="/twalletsecond-page" element={<TwalletSecondPage />} />
        <Route path="/hmwssbsecond-page" element={<HmwssbSecondPage />} />
        <Route path="/ghmcsecond-page" element={<GhmcSecondPage />} />
        <Route path="/endowmentsecond-page" element={<EndowmentSecondPage />} />
        <Route path="/cmdasecond-page" element={<CmdaSecondPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </div>
  );
}

// Wrap App with Router
const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
