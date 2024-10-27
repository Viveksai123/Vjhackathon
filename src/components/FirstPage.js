// src/components/FirstPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { FaShieldAlt, FaBolt, FaWallet, FaBuilding, FaWater, FaCity, FaHandsHelping, FaFileAlt } from 'react-icons/fa';

const FirstPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();

  const handleButtonClick = () => {
    navigate('/second-page');
  };

  const handleButtonClick1 = () => {
    navigate('/policesecond-page');
  };
  const handleButtonClick2 = () => {
    navigate('/tgspdcsecond-page');
  };
  const handleButtonClick3 = () => {
    navigate('/twalletsecond-page');
  };
  const handleButtonClick4 = () => {
    navigate('/ghmcsecond-page');
  };
  const handleButtonClick5 = () => {
    navigate('/hmwssbsecond-page');
  };
  const handleButtonClick6 = () => {
    navigate('/cmdasecond-page');
  };
  const handleButtonClick7 = () => {
    navigate('/endowmentsecond-page');
  };

  return (
    <div className="p-6 m-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Display a welcome message if logged in, or a prompt if logged out */}
      {isAuthenticated ? (
        <h2>Welcome, {user.name}!</h2>
      ) : (
        <h2>Please log in to get personalized experience.</h2>
      )}

      {/* Buttons to navigate between pages */}
      <button
        onClick={handleButtonClick}
        className="button bg-blue-500 text-white px-6 py-4 rounded hover:bg-blue-600 transition-all duration-500 transform hover:scale-105 hover:shadow-lg"
      >
        <FaFileAlt className="inline-block mr-2" size={36} /> Go to Rta
      </button>

      <button
        onClick={handleButtonClick1}
        className="button bg-red-500 text-white px-6 py-4 rounded hover:bg-red-600 transition-all duration-500 transform hover:scale-105 hover:shadow-lg"
      >
        <FaShieldAlt className="inline-block mr-2" size={36} /> Go to Police
      </button>

      <button
        onClick={handleButtonClick2}
        className="button bg-yellow-500 text-white px-6 py-4 rounded hover:bg-yellow-600 transition-all duration-500 transform hover:scale-105 hover:shadow-lg"
      >
        <FaBolt className="inline-block mr-2" size={36} /> Go to tgspdc
      </button>

      <button
        onClick={handleButtonClick3}
        className="button bg-green-500 text-white px-6 py-4 rounded hover:bg-green-600 transition-all duration-500 transform hover:scale-105 hover:shadow-lg"
      >
        <FaWallet className="inline-block mr-2" size={36} /> Go to twallet
      </button>

      <button
        onClick={handleButtonClick4}
        className="button bg-purple-500 text-white px-6 py-4 rounded hover:bg-purple-600 transition-all duration-500 transform hover:scale-105 hover:shadow-lg"
      >
        <FaBuilding className="inline-block mr-2" size={36} /> Go to ghmc
      </button>

      <button
        onClick={handleButtonClick5}
        className="button bg-orange-500 text-white px-6 py-4 rounded hover:bg-orange-600 transition-all duration-500 transform hover:scale-105 hover:shadow-lg"
      >
        <FaWater className="inline-block mr-2" size={36} /> Go to hmwssb
      </button>

      <button
        onClick={handleButtonClick6}
        className="button bg-pink-500 text-white px-6 py-4 rounded hover:bg-pink-600 transition-all duration-500 transform hover:scale-105 hover:shadow-lg"
      >
        <FaCity className="inline-block mr-2" size={36} /> Go to cmda
      </button>

      <button
        onClick={handleButtonClick7}
        className="button bg-teal-500 text-white px-6 py-4 rounded hover:bg-teal-600 transition-all duration-500 transform hover:scale-105 hover:shadow-lg"
      >
        <FaHandsHelping className="inline-block mr-2" size={36} /> Go to endowment
      </button>
    </div>
  );
};

export default FirstPage;
