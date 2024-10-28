import React, { useState } from 'react';
import './Page.css'

const Header = ({ activeLanguage, changeLanguage }) => {
  const southIndianStates = ["Andhra Pradesh", "Karnataka", "Kerala", "Tamil Nadu", "Telangana"];
  
  // Set default state to "Telangana"
  const [selectedState, setSelectedState] = useState("Telangana");



  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };


  return (
    <header className="relative w-full p-4 bg-transparent marginTop">
      {/* Flex Container for Header */}
      <div className="flex justify-between items-center w-full flex-wrap gap-4">
        {/* Title */}
      <img src="./logo1.jpg" alt="logo" className='img'/>

        {/* Language Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="languageSelect" className="text-black font-medium">Language:</label>
          <select
            id="languageSelect"
            className="p-2 bg-transparent text-black rounded-md border border-black outline-none"
            value={activeLanguage}
            onChange={(e) => changeLanguage(e.target.value)}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <option value="EN" className="text-black">English</option>
            <option value="TE" className="text-black">Telugu</option>
            <option value="TA" className="text-black">Tamil</option>
            <option value="KN" className="text-black">Kannada</option>
            <option value="ML" className="text-black">Malayalam</option>
          </select>
        </div>

        {/* State Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="State" className="text-black font-medium">State:</label>
          <select
            id="State"
            className="p-2 bg-transparent text-black rounded-md border border-black outline-none"
            value={selectedState}
            onChange={handleStateChange}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {southIndianStates.map((state) => (
              <option key={state} value={state} className="text-black">
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Display Selected State */}
        {selectedState && (
          <div className="text-black text-lg font-semibold">
            <h2>{selectedState}</h2>
          </div>
        )}

      </div>
    </header>
  );
};

export default Header;
