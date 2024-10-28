// register.js

import React, { useState } from 'react';
import axios from 'axios';

const UploadDocuments = () => {
  const [certificates, setCertificates] = useState(['']); // Initialize with one empty field

  // Function to handle adding a new certificate field
  const addCertificateField = () => {
    setCertificates([...certificates, '']);
  };

  // Function to handle changes in each certificate field
  const handleCertificateChange = (index, event) => {
    const newCertificates = [...certificates];
    newCertificates[index] = event.target.files[0];
    setCertificates(newCertificates);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create FormData object to handle file uploads
    const formData = new FormData();
    certificates.forEach((certificate, index) => {
      if (certificate) {
        formData.append(`certificate${index + 1}`, certificate);
      }
    });

    try {
      // Send the form data to the server
      await axios.post('https://json-production-4a9d.up.railway.app/records', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Documents uploaded successfully!');
    } catch (error) {
      console.error('Error uploading documents:', error);
      alert('Failed to upload. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <h2>Upload Documents</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Certificates:</label>
          {certificates.map((_, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <input
                type="file"
                onChange={(e) => handleCertificateChange(index, e)}
                required={index === 0}
              />
            </div>
          ))}
          <button type="button" onClick={addCertificateField} style={{ marginTop: '10px' }}>
            Add More
          </button>
        </div>

        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadDocuments;
