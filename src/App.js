import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SecondPage from './components/SecondPage'
import FirstPage from './components/FirstPage';
import TgspdcSecondPage from './components/TgspdcSecondPage';
import TwalletSecondPage from './components/TwalletSecondPage';
import GhmcSecondPage from './components/GhmcSecondPage';
import HmwssbSecondPage from './components/HmwssbSecondPage';
import EndowmentSecondPade from './components/EndowmentSecondPade';
import CmdaSecondPage from './components/CmdaSecondPage';
import PoliceSecondPage from './components/PoliceSecondPage';


function App() {
  return (
    <Router>
      <div className="p-4">
        <Routes>
        <Route path="/" element={<FirstPage />} />
          <Route path="/second-page" element={<SecondPage />} />
          <Route path="/policesecond-page" element={<PoliceSecondPage />} />
          <Route path="/tgspdcsecond-page" element={<TgspdcSecondPage />} />
          <Route path="/twalletsecond-page" element={<TwalletSecondPage />} />
          <Route path="/hmwssbsecond-page" element={<HmwssbSecondPage />} />
          <Route path="/ghmcsecond-page" element={<GhmcSecondPage />} />
          <Route path="/endowmentsecond-page" element={<EndowmentSecondPade />} />
          <Route path="/cmdasecond-page" element={<CmdaSecondPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
