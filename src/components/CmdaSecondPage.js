import React, { useState, useEffect } from 'react';
import './Page.css'

const CmdaPage = () => {
  const [servicesData, setServicesData] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/cmda.json');
        if (!response.ok) {
          throw new Error('Failed to fetch services data');
        }
        const data = await response.json();
        setServicesData(data);
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        setError('Error fetching services data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const renderMultiLineText = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  if (loading) {
    return <p>Loading...</p>; // Display loading message while fetching data
  }

  if (error) {
    return (
      <div className="text-red-500">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="text-blue-500 underline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {language === 'en' ? 'CMDA Services' : 'CMDA సేవలు'}
      </h1>

      <div className="mb-4">
        <label className="mr-2">
          {language === 'en' ? 'Select Language:' : 'భాషను ఎంచుకోండి:'}
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border p-1"
          aria-label="Language Selector"
        >
          <option value="en">English</option>
          <option value="te">Telugu</option>
        </select>
      </div>

      {selectedService ? (
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
            aria-label="Back to service list"
          >
            {language === 'en' ? 'Back to List' : 'జాబితా వైపు తిరిగి'}
          </button>
        </div>
      ) : (
        <ul className="list-disc pl-6">
          {servicesData.map((service, index) => (
            <li key={index} className="mb-4">
              <p className="font-semibold">
                {service["S.No"]}. {service["Service Name"][language]}
              </p>
              <p>CMDA</p>
              <button
                className="ml-4 text-white-500"
                onClick={() => handleServiceClick(service)}
                aria-label={`View details of ${service["Service Name"][language]}`}
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

export default CmdaPage;
