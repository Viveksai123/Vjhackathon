import React, { useState, useEffect } from 'react';

const HmwssbSecondPage = () => {
  const [servicesData, setServicesData] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [error, setError] = useState(''); // State to handle errors
  const [language, setLanguage] = useState('en'); // State to handle selected language

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the public folder
        const response = await fetch('/hmwssb.json');
        if (!response.ok) {
          throw new Error('Failed to fetch services data');
        }
        const data = await response.json();
        setServicesData(data);
      } catch (error) {
        setError('Error fetching services data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  // Function to handle selecting a service
  const handleServiceClick = (service) => {
    setSelectedService(service); // Set the selected service
  };

  // Function to render multiline text for service details
  const renderMultiLineText = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  // If there's an error, display the error message
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {language === 'en' ? 'Hmwssb Services' : 'Hmwssb సేవలు'}
      </h1>

      {/* Language Selector */}
      <div className="mb-4">
        <label className="mr-2">
          {language === 'en' ? 'Select Language:' : 'భాషను ఎంచుకోండి:'}
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border p-1"
        >
          <option value="en">English</option>
          <option value="te">Telugu</option>
        </select>
      </div>

      {selectedService ? (
        // Display service details if a service is selected
        <div>
          <h2 className="text-xl font-bold">{selectedService["Service Name"][language]}</h2>
          <p>
            <strong>{language === 'en' ? 'Fee:' : 'శ్రేణి:'}</strong> {selectedService["Fee Value"][language]}
          </p>
          <p>
            <strong>{language === 'en' ? 'Timeline:' : 'సమయం:'}</strong> {selectedService["Timeline Value"][language]}
          </p>
          <p className="mt-4">
            <strong>{language === 'en' ? 'Description:' : 'వివరణ:'}</strong> {renderMultiLineText(selectedService["Description"][language])}
          </p>
          <p>
            <strong>{language === 'en' ? 'Service Delivery Channels:' : 'సేవ అందింపు ఛానల్స్:'}</strong> {renderMultiLineText(selectedService["Service Delivery Channels"][language])}
          </p>
          <p>
            <strong>{language === 'en' ? 'Service Timings:' : 'సేవ సమయాలు:'}</strong> {renderMultiLineText(selectedService["Service Timings"][language])}
          </p>
          <p>
            <strong>{language === 'en' ? 'Service Payment Modes:' : 'సేవ చెల్లింపు పద్ధతులు:'}</strong> {renderMultiLineText(selectedService["Payment Modes"][language])}
          </p>
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => setSelectedService(null)}
          >
            {language === 'en' ? 'Back to List' : 'జాబితా వైపు తిరిగి'}
          </button>
        </div>
      ) : (
        // Display the list of services if no service is selected
        <ul className="list-disc pl-6">
          {servicesData.map((service, index) => (
            <li key={index} className="mb-4">
              <p className="font-semibold">
                {service["S.No"]}. {service["Service Name"][language]}
              </p>
              <p>Hmwssb</p>
              <button
                className="ml-4 text-blue-500 underline"
                onClick={() => handleServiceClick(service)}
              >
                {language === 'en' ? 'View Details' : 'వివరాలు చూడండి'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HmwssbSecondPage;
