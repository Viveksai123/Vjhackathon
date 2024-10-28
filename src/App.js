// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
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

function App() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await fetch('http://localhost:3000/files', { // Replace with your JSON server endpoint
        method: 'POST',
        body: formData,
      });
      alert('File uploaded successfully');
      setShowModal(false);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <Router>
      <div className="p-4">
        <div className="flex justify-end space-x-4 mb-4">
          {!isAuthenticated ? (
            <div className="flex flex-row justify-between items-center">
              <div>
                <button
                  onClick={() => loginWithRedirect()}
                  className="bg-blue-500 text-white px-4 py-2 mr-5 rounded"
                >
                  Log In
                </button>
                <button
                  onClick={() => setShowModal(true)} // Open modal for registration
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Register
                </button>
              </div>
            </div>
          ) : (
            <p></p>
          )}
        </div>

        {/* Modal for file upload */}
        {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full z-50">
      <h2 className="text-xl font-bold mb-4">Upload File</h2>
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
      <button
        onClick={() => setShowModal(false)}
        className="bg-red-500 text-white px-4 py-2 rounded ml-2"
      >
        Cancel
      </button>
    </div>
  </div>
)}

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
    </Router>
  );
}

export default App;
