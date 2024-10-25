import React, { useState, useEffect } from 'react';
import './Page.css';

const PoliceSecondPage = () => {
  const [servicesData, setServicesData] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en');
  const [parallaxClass, setParallaxClass] = useState(''); // State to manage parallax effect

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Cmda.json');
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

    // Listen for scroll events
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setParallaxClass('parallax-left');
      } else {
        setParallaxClass('');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
    <div>
      <div className="nav">
        <h1 className={`title ${parallaxClass} text-red-500`}>
          {language === 'en' ? 'CMDA Services' : 'CMDA సేవలు'}
        </h1>

        <div className="language-selector">
          <label className="language-label" style={{marginTop:"8px",fontWeight:"bold"}}>
            {language === 'en' ? 'Select Language:' : 'భాషను ఎంచుకోండి:'}
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="select-dropdown"
          >
            <option value="en">English</option>
            <option value="te">Telugu</option>
          </select>
        </div>
      </div>

      <div className="container">
        {selectedService ? (
          <div className="service-details">
            <h1 className="title6 text-red-500">
              {selectedService["Service Name"][language]}
            </h1>
            <table className="details-table">
              <tbody>
                <tr>
                  <td>{language === 'en' ? 'Fee:' : 'శ్రేణి:'}</td>
                  <td>{selectedService["Fee Value"][language]}</td>
                </tr>
                <tr>
                  <td>{language === 'en' ? 'Timeline:' : 'సమయం:'}</td>
                  <td>{selectedService["Timeline Value"][language]}</td>
                </tr>
                <tr>
                  <td>{language === 'en' ? 'Description:' : 'వివరణ:'}</td>
                  <td>{renderMultiLineText(selectedService["Description"][language])}</td>
                </tr>
                <tr>
                  <td>{language === 'en' ? 'Service Delivery Channels:' : 'సేవ అందింపు ఛానల్స్:'}</td>
                  <td>{renderMultiLineText(selectedService["Service Delivery Channels"][language])}</td>
                </tr>
                <tr>
                  <td>{language === 'en' ? 'Service Timings:' : 'సేవ సమయాలు:'}</td>
                  <td>{renderMultiLineText(selectedService["Service Timings"][language])}</td>
                </tr>
                <tr>
                  <td>{language === 'en' ? 'Service Payment Modes:' : 'సేవ చెల్లింపు పద్ధతులు:'}</td>
                  <td>{renderMultiLineText(selectedService["Payment Modes"][language])}</td>
                </tr>
              </tbody>
            </table>
            <button
              className="bg-orange-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              onClick={() => setSelectedService(null)}
            >
              {language === 'en' ? 'Back to List' : 'జాబితా వైపు తిరిగి'}
            </button>
          </div>
        ) : (
          <table className="services-table">
            <thead>
              <tr>
                <th>{language === 'en' ? 'S.No' : 'క్రమ సంఖ్య'}</th>
                <th>{language === 'en' ? 'Service Name' : 'సేవ పేరు'}</th>
                <th>{language === 'en' ? 'Actions' : 'చర్యలు'}</th>
              </tr>
            </thead>
            <tbody>
              {servicesData.map((service, index) => (
                <tr key={index}>
                  <td>{service["S.No"]}</td>
                  <td>{service["Service Name"][language]}</td>
                  <td>
                    <button
                      className="bg-orange-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                      onClick={() => handleServiceClick(service)}
                    >
                      {language === 'en' ? 'View Details' : 'వివరాలు చూడండి'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PoliceSecondPage;
