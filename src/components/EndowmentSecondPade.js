import React, { useState, useEffect } from 'react';
import './Page.css'

const EndowmentSecondPage = () => {
  const [servicesData, setServicesData] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/endowment.json');
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

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {language === 'en' ? 'Endowment Services' : 'Endowment సేవలు'}
      </h1>

      {/* Language Selector */}
      <div className="mb-4 text-center">
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
        // Display service details in a structured block
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">
            {selectedService["Service Name"][language]}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p>
              <strong>{language === 'en' ? 'Fee:' : 'శ్రేణి:'}</strong> {selectedService["Fee Value"][language]}
            </p>
            <p>
              <strong>{language === 'en' ? 'Timeline:' : 'సమయం:'}</strong> {selectedService["Timeline Value"][language]}
            </p>
            <p className="sm:col-span-2">
              <strong>{language === 'en' ? 'Description:' : 'వివరణ:'}</strong> {renderMultiLineText(selectedService["Description"][language])}
            </p>
            <p className="sm:col-span-2">
              <strong>{language === 'en' ? 'Service Delivery Channels:' : 'సేవ అందింపు ఛానల్స్:'}</strong> {renderMultiLineText(selectedService["Service Delivery Channels"][language])}
            </p>
            <p className="sm:col-span-2">
              <strong>{language === 'en' ? 'Service Timings:' : 'సేవ సమయాలు:'}</strong> {renderMultiLineText(selectedService["Service Timings"][language])}
            </p>
            <p className="sm:col-span-2">
              <strong>{language === 'en' ? 'Service Payment Modes:' : 'సేవ చెల్లింపు పద్ధతులు:'}</strong> {renderMultiLineText(selectedService["Payment Modes"][language])}
            </p>
          </div>
          <button
            className="mt-6 bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => setSelectedService(null)}
          >
            {language === 'en' ? 'Back to List' : 'జాబితా వైపు తిరిగి'}
          </button>
        </div>
      ) : (
        // Display list of services in table format
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-lg rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">
                  {language === 'en' ? 'S.No' : 'క్రమ సంఖ్య'}
                </th>
                <th className="border px-4 py-2 text-left">
                  {language === 'en' ? 'Service Name' : 'సేవ పేరు'}
                </th>
                <th className="border px-4 py-2 text-left">
                  {language === 'en' ? 'Category' : 'వర్గం'}
                </th>
                <th className="border px-4 py-2 text-left">
                  {language === 'en' ? 'Actions' : 'చర్యలు'}
                </th>
              </tr>
            </thead>
            <tbody>
              {servicesData.map((service, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{service["S.No"]}</td>
                  <td className="border px-4 py-2">{service["Service Name"][language]}</td>
                  <td className="border px-4 py-2">Endowment</td>
                  <td className="border px-4 py-2">
                    <button
                      className="text-white-500"
                      onClick={() => handleServiceClick(service)}
                    >
                      {language === 'en' ? 'View Details' : 'వివరాలు చూడండి'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EndowmentSecondPage;
