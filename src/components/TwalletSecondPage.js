import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';  // Importing Font Awesome icon
import './Page.css';

const TwalletSecondPage = () => {
  const [servicesData, setServicesData] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en');
  const [parallaxClass, setParallaxClass] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/cmda.json');
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

  function checkBoxes() {
    const triggerBottom = window.innerHeight / 5 * 4;
    const rows = document.querySelectorAll('.fade-in-service');

    rows.forEach((row) => {
        const rowTop = row.getBoundingClientRect().top;

        if (rowTop < triggerBottom) {
            row.classList.add('show');
        } else {
            row.classList.remove('show');
        }
    });
}

window.addEventListener('scroll', checkBoxes);
checkBoxes();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredServices = servicesData.filter((service) =>
    service["Service Name"][language].toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <div className="nav">
        <h1 className={`title ${parallaxClass} text-red-500`} style={{fontFamily:"playfair display"}}>
          {language === 'en' ? 'CMDA Services' : 'CMDA సేవలు'}
        </h1>

        <div className="language-selector">
          <label className="language-label" style={{  fontWeight: "bold" }}>
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
            <h1 className="title text-red-500">
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
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              onClick={() => setSelectedService(null)}
            >
              {language === 'en' ? 'Back to List' : 'జాబితా వైపు తిరిగి'}
            </button>
          </div>
        ) : (<div> <div className="search-bar">
          <FaSearch className="search-icon" /> 
          <input
            type="text"
            value={searchTerm}
            placeholder={language === 'en' ? 'Search Services...' : 'సేవలను వెతకండి...'}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

          <table className="services-table">
            
  <thead>
    <tr>
      <th>{language === 'en' ? 'S.No' : 'క్రమ సంఖ్య'}</th>
      <th>{language === 'en' ? 'Service Name' : 'సేవ పేరు'}</th>
      <th>{language === 'en' ? 'Actions' : 'చర్యలు'}</th>
    </tr>
  </thead>
  <tbody>
    {filteredServices.map((service, index) => (
      <tr
        key={index}
        className={`fade-in-service ${index % 2 === 0 ? 'fade-in-right' : 'fade-in-left'}`}
      >
        <td>{service["S.No"]}</td>
        <td>{service["Service Name"][language]}</td>
        <td>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
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
    </div>
  );
};

export default TwalletSecondPage;
