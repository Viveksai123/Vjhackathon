// src/components/FirstPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import {
  FaShieldAlt, FaBolt, FaWallet, FaBuilding, FaWater,
  FaCity, FaHandsHelping, FaFileAlt, FaComments, FaTimes,
  FaCheckCircle, FaTimesCircle,FaFacebook,FaTwitter,FaInstagram,FaLinkedin,FaUser    
} from 'react-icons/fa';
import './Page.css';

const FirstPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth0();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  const userPhoneNumber = "8106035425";

  const documentVerification = [
    { label: 'Driving Licence', status: 'pending' },
    { label: 'Aadhar Updation', status: 'verified' }
  ];
  const applicationStatus = [
    { label: 'Birth certificate', status: 'verified' },
    { label: 'Aadhar', status: 'verified' },
  ];

  // Document Verification Section

  const navigationButtons = [
    { label: "Go to RTA", icon: FaFileAlt, route: '/second-page', gradient: "from-blue-500 to-blue-700" },
    { label: "Go to Police", icon: FaShieldAlt, route: '/policesecond-page', gradient: "from-red-500 to-red-700" },
    { label: "Go to TGSPDC", icon: FaBolt, route: '/tgspdcsecond-page', gradient: "from-yellow-500 to-yellow-700" },
    { label: "Go to T-Wallet", icon: FaWallet, route: '/twalletsecond-page', gradient: "from-green-500 to-green-700" },
    { label: "Go to GHMC", icon: FaCity, route: '/ghmcsecond-page', gradient: "from-indigo-500 to-indigo-700" },
    { label: "Go to HMWSSB", icon: FaWater, route: '/hmwssbsecond-page', gradient: "from-teal-500 to-teal-700" },
    { label: "Go to CMDA", icon: FaBuilding, route: '/cmdasecond-page', gradient: "from-purple-500 to-purple-700" },
    { label: "Go to Endowments", icon: FaHandsHelping, route: '/endowmentsecond-page', gradient: "from-pink-500 to-pink-700" },
  ];

  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const handleUserMessageChange = (event) => setUserMessage(event.target.value);

  const generateBotResponse = (message) => {
    if (message.includes('hello')) return "Hello! How can I assist you today?";
    if (message.includes('help')) return "Sure! Let me know what you need help with.";
    if (message.includes('services')) return "We provide various services. Which one would you like to know about?";
    if (message.includes('contact')) return "You can contact us at support@yourcompany.com.";
    return "I'm here to help! Please ask your question.";
  };

  const handleSendMessage = () => {
    if (userMessage.trim()) {
      const newMessage = { type: 'user', text: userMessage };
      const botResponse = { type: 'bot', text: generateBotResponse(userMessage.toLowerCase()) };
      setChatMessages([...chatMessages, newMessage, botResponse]);
      setUserMessage('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="overflow-hidden relative">
        <div className="flex animate-scroll">
          <img src="https://via.placeholder.com/300" alt="A scenic view of nature" className="w-1/4 object-cover scroll-image" />
          <img src="https://via.placeholder.com/300" alt="A beautiful city skyline" className="w-1/4 object-cover scroll-image" />
          <img src="https://via.placeholder.com/300" alt="A stunning sunset over the ocean" className="w-1/4 object-cover scroll-image" />
          <img src="https://via.placeholder.com/300" alt="A tranquil forest path" className="w-1/4 object-cover scroll-image" />
          <img src="https://via.placeholder.com/300" alt="A scenic view of nature" className="w-1/4 object-cover scroll-image" />
          <img src="https://via.placeholder.com/300" alt="A beautiful city skyline" className="w-1/4 object-cover scroll-image" />
          <img src="https://via.placeholder.com/300" alt="A stunning sunset over the ocean" className="w-1/4 object-cover scroll-image" />
          <img src="https://via.placeholder.com/300" alt="A tranquil forest path" className="w-1/4 object-cover scroll-image" />
        </div>
      </div>

      <div className="flex-grow p-6 mx-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div className="col-span-full text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">
            {isAuthenticated ? `Welcome, ${user.name}!` : 'Please log in for a personalized experience.'}
          </h2>
        </div>

        {navigationButtons.map((button, index) => (
          <button
            key={index}
            onClick={() => navigate(button.route)}
            className={`button bg-gradient-to-r ${button.gradient} text-white px-6 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center`}
          >
            <button.icon className="mr-2" size={24} /> {button.label}
          </button>
        ))}
      </div>
     {/* Profile Icon and Popup */}
      <div className="fixed top-6 right-6 z-50"> 
  {isAuthenticated && ( // Only show the profile button if the user is authenticated
    <button
      onClick={toggleProfile}
      className="bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-900 transition duration-200 focus:outline-none"
      aria-label="Open Profile"
    >
      <FaUser size={24} />
    </button>
  )}
  
  {isProfileOpen && isAuthenticated && (
    <div className="fixed top-16 right-6 w-80 max-h-96 bg-white rounded-lg shadow-lg p-4 z-50 overflow-y-auto"> 
      <button
        onClick={toggleProfile}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        aria-label="Close Profile"
      >
        <FaTimes size={18} />
      </button>
      <div className="flex flex-col items-center">
        <img
          src={user.picture}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
        <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
        <p className="text-gray-600">{userPhoneNumber}</p>

       
        <div className="mt-4 w-full text-left">
          <h4 className="text-lg font-semibold text-gray-800">Add Documents:</h4>
          <ul className="mt-2 space-y-2">
            {applicationStatus.map((status, index) => (
              <li key={index} className="flex items-center">
                {status.label}
                {status.status === 'verified' ? (
                  <FaCheckCircle className="ml-2 text-green-500" size={20} />
                ) : (
                  <FaTimesCircle className="ml-2 text-green-500" size={20} />
                )}
              </li>
            ))}
          </ul>
        </div>

   
        <div className="mt-6 w-full text-left">
          <h4 className="text-lg font-semibold text-gray-800">Applications:</h4>
          <ul className="mt-2 space-y-2">
            {documentVerification.map((doc, index) => (
              <li key={index} className="flex items-center">
                {doc.label}
                {doc.status === 'verified' ? (
                  <FaCheckCircle className="ml-2 text-green-500" size={20} />
                ) : (
                  <FaTimesCircle className="ml-2 text-yellow-500" size={20} />
                )}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => logout({ returnTo: window.location.origin })}
          className="mt-6 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  )}
</div>



      {/* Applications and Latest Services Section */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Application Status Section */}
        <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaFileAlt className="mr-2 text-blue-500" /> Application Status
          </h3>
          <ul className="space-y-6">
            {documentVerification.map((doc, index) => (
              <li key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-all duration-200  hover:scale-105">
                <div className="flex items-center space-x-3">
                  <span className={`flex-shrink-0 w-10 h-10 rounded-full ${doc.status === 'verified' ? 'bg-green-500' : 'bg-yellow-500'} flex items-center justify-center text-white`}>
                    {doc.status === 'verified' ? <FaCheckCircle size={18} /> : <FaTimesCircle size={18} />}
                  </span>
                  <div className="text-left">
                    <h4 className="text-lg font-semibold text-gray-800">{doc.label}</h4>
                    <p className="text-gray-500 text-sm">
                      {doc.status === 'verified' ? "Your document is verified" : "Verification in progress"}
                    </p>
                  </div>
                </div>
                <button className="mt-4 bg-gradient-to-r from-purple-500 to-purple-400 text-white px-4 py-2 rounded-lg shadow-md hover:from-purple-700 hover:to-purple-500 transform transition-all duration-300">
                  View Details
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Latest Services Section */}
        <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaBolt className="mr-2 text-yellow-500" /> Latest Services
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3 hover:scale-105">
              <FaFileAlt className="text-blue-500" size={24} />
              <div>
                <h4 className="text-lg font-semibold text-gray-800">Digital Signature Issuance</h4>
                <p className="text-gray-500 text-sm">Get a secure digital signature for online transactions and document signing.</p>
                <button className="mt-4 bg-gradient-to-r from-green-600 to-green-400 text-white px-4 py-2 rounded-lg shadow-md hover:from-green-700 hover:to-green-500 transform transition-all duration-300">
                  Apply Now
                </button>
              </div>
            </li>
            <li className="flex items-start space-x-3 hover:scale-105">
              <FaHandsHelping className="text-green-500" size={24} />
              <div>
                <h4 className="text-lg font-semibold text-gray-800">Social Welfare Scheme</h4>
                <p className="text-gray-500 text-sm">Join our social welfare program for eligible citizens.</p>
                <button className="mt-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-500 transform transition-all duration-300">
                  Apply Now
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Chat Support Section */}
     {/* Chatbot Icon and Popup */}
<div className="fixed bottom-6 right-6">
  <button
    onClick={toggleChat}
    className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-200 focus:outline-none"
    aria-label="Open Chat"
  >
    <FaComments size={24} />
  </button>

  {isChatOpen && (
    <div className="fixed bottom-16 right-6 w-80 h-96 bg-white rounded-lg shadow-lg p-4 flex flex-col overflow-y-auto"> {/* Chat popup scroll */}
      <button
        onClick={toggleChat}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        aria-label="Close Chat"
      >
        <FaTimes size={18} />
      </button>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Chat with Us</h3>
      <div className="flex-grow overflow-y-auto mb-4">
        {chatMessages.map((msg, index) => (
          <div key={index} className={`my-1 p-2 rounded-lg ${msg.type === 'user' ? 'bg-blue-200 self-end' : 'bg-gray-200 self-start'}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={userMessage}
          onChange={handleUserMessageChange}
          placeholder="Type a message..."
          className="flex-grow border rounded-l-lg px-2 py-1 focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 text-white px-4 py-1 rounded-r-lg hover:bg-blue-700 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  )}
</div>

    

      {/* Profile Section */}
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 mt-8">
  <div className="mx-auto text-center space-y-4">
    <p className="text-gray-500 text-lg font-medium">Connect with us on social media</p>
    <div className="flex justify-center space-x-8">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition transform hover:scale-110">
        <FaFacebook size={28} />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition transform hover:scale-110">
        <FaTwitter size={28} />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition transform hover:scale-110">
        <FaInstagram size={28} />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition transform hover:scale-110">
        <FaLinkedin size={28} />
      </a>
    </div>
    <div className="text-gray-500 text-sm">&copy; 2024 Your Company. All rights reserved.</div>
  </div>
</footer>

    </div>
  );
};

export default FirstPage;
