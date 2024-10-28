// src/components/RegisterModal.js

import React, { useState } from 'react';

function RegisterModal({ showModal, setShowModal }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await fetch('http://localhost:3000/files', { // Replace with your JSON server endpoint
        method: 'POST',
        body: formData,
      });
      alert('File uploaded successfully');
      setShowModal(false);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full z-50">
        <h2 className="text-xl font-bold mb-4">Upload File</h2>
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4"
        />
        <button
          onClick={handleUpload}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
        <button
          onClick={() => setShowModal(false)}
          className="bg-red-500 text-white px-4 py-2 rounded ml-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default RegisterModal;
