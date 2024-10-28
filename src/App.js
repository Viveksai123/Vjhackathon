// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import RegisterModal from './components/RegisterModal';
import SecondPage from './components/SecondPage';
import FirstPage from './components/FirstPage';
import TgspdcSecondPage from './components/TgspdcSecondPage';
import TwalletSecondPage from './components/TwalletSecondPage';
import GhmcSecondPage from './components/GhmcSecondPage';
import HmwssbSecondPage from './components/HmwssbSecondPage';
import EndowmentSecondPage from './components/EndowmentSecondPage';
import CmdaSecondPage from './components/CmdaSecondPage';
import PoliceSecondPage from './components/PoliceSecondPage';
import ContactUs from './components/ContactUs';
import axios from 'axios';

function App() {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0(); // Extract user from useAuth0()
  const [showModal, setShowModal] = useState(false);

  // Function to send user data to the server if not already present
  const sendUserDataToServer = async (userData) => {
    try {
      // First, check if the user already exists on the server by querying the userid
      const existingUser = await axios.get(
        `https://json-production-4a9d.up.railway.app/records?userid=${userData.userid}`
      );

      // If the user does not exist (empty array), add the user data
      if (existingUser.data.length === 0) {
        const response = await axios.post('https://json-production-4a9d.up.railway.app/records', userData);
        console.log('New user data sent successfully:', response.data);
      } else {
        console.log('User already exists, no need to send data.');
      }
    } catch (error) {
      console.error('Error checking or sending user data:', error);
    }
  };

  // Use Effect to send data after login
  useEffect(() => {
    if (isAuthenticated && user?.sub) {
      const userData = {
        userid: user.sub,
        name: user.name, // username
        email: user.email, // user email
        picture: user.picture, // user profile picture URL, if available
      };
      sendUserDataToServer(userData);
    }
  }, [isAuthenticated, user]);

  return (
    <Router>
      <div className="p-4">
        <div className="flex justify-end space-x-4 mb-4">
          {!isAuthenticated ? (
            <button
              onClick={() => loginWithRedirect()}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Log In
            </button>
          ) : (
            <button
              onClick={() => setShowModal(true)} // Show modal for registration
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Register
            </button>
          )}
        </div>

        {/* Register Modal */}
        <RegisterModal 
          showModal={showModal} 
          setShowModal={setShowModal} 
          user={user} // Pass the user object directly
        />

        {/* Routes */}
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
    </Router>
  );
}

export default App;
