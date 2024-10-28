// src/App.js

import React from 'react';
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

  return (
    <Router>
      <div className="p-4">
       
        <div className="flex justify-end space-x-4 mb-4">
          {!isAuthenticated ? (
            <div className='flex flex-row justify-between items-center'>
              {/* <div>
             <img src="./logo.jpg" alt="logo" className='img align-start'/> 
             </div> */}
             <div>
            <button
              onClick={() => loginWithRedirect()}
              className="bg-blue-500 text-white px-4 py-2 mr-5 rounded"
            >
              Log In
            </button>
             <button
             onClick={() => loginWithRedirect()}
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
