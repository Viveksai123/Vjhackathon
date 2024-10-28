  import React, { useState, useEffect } from 'react';
  import { FaSearch } from 'react-icons/fa';
  import './Page.css';

  const SecondPage = () => {
    const [servicesData, setServicesData] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [language, setLanguage] = useState('en');
    const [parallaxClass, setParallaxClass] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/rta.json');
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

    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };

    const filteredServices = servicesData.filter((service) =>
      service["Service Name"][language].toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (error) {
      return <p className="bg-blue-500">{error}</p>;
    }

    return (
      <div>
        <div className="nav">
          <h1 className={`title ${parallaxClass}`} style={{ fontFamily: "playfair display", color: "#3B82F6" }}>
            {language === 'en' ? 'RTA Services' : 'RTA సేవలు'}
          </h1>

          <div className="language-selector">
            <label className="language-label" style={{ fontWeight: "bold" }}>
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
            <div className="service-container">
              {/* Service Details Section */}
              <div className="service-details" style={{ flex: '1 1 60%' }}>
                <h1 className="title" style={{ color: "#3B82F6" }}>
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
                <div className='flex justify-between'>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  onClick={() => setSelectedService(null)}
                >
                  {language === 'en' ? 'Back to List' : 'జాబితా వైపు తిరిగి'}
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded "
                  onClick={() => alert('Apply Now clicked!')}
                >
                  {language === 'en' ? 'Apply Now' : 'దరఖాస్తు చేయండి'}
                </button>
              </div>
              </div>

              {/* Apply Now Section */}
              <div className="apply-now-section" style={{ flex: '1 1 40%', padding: '1em' }}>
               
                <div className="document-status">
                  <h3>{language === 'en' ? 'Document Status:' : 'డాక్యుమెంట్ స్థితి:'}</h3>
                  <br/>
                  <ul>
                    <li className="status-item">
                      <span className="status-icon correct">✔</span>
                      {language === 'en' ? 'Document 1 (Correct)' : 'డాక్యుమెంట్ 1 (సరైనది)'}
                    </li>
                    <li className="status-item">
                      <span className="status-icon wrong">✖</span>
                      {language === 'en' ? 'Document 2 (Incorrect)' : 'డాక్యుమెంట్ 2 (తప్పు)'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="search-bar">
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
                    <th style={{ backgroundColor: "#3B82F6" }}>{language === 'en' ? 'S.No' : 'క్రమ సంఖ్య'}</th>
                    <th style={{ backgroundColor: "#3B82F6" }}>{language === 'en' ? 'Service Name' : 'సేవ పేరు'}</th>
                    <th style={{ backgroundColor: "#3B82F6" }}>{language === 'en' ? 'Actions' : 'చర్యలు'}</th>
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
                          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
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

  export default SecondPage;
