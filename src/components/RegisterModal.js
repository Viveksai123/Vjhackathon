// src/components/RegisterModal.js

import React, { useState } from 'react';
import axios from 'axios';

// Utility function to generate a random hash-like string
const generateTransactionId = () =>
  Math.random().toString(36).substring(2) + Date.now().toString(36);

// Utility function to generate a random block number between 1 and 10
const generateBlockNumber = () => Math.floor(Math.random() * 10) + 1;

// Utility function to get the current timestamp
const getCurrentTimestamp = () => new Date().toISOString();

function RegisterModal({ showModal, setShowModal, user }) {
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Store the selected file
  };

  // Handle file upload and update user data
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      console.log("No file selected.");
      return;
    }

    if (!user || !user.sub) {
      console.error("User or user.sub is not available.");
      return;
    }

    try {
      // Prepare the form data for the file upload
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Step 1: Send the file to the extraction endpoint
      const extractResponse = await axios.post(
        'http://127.0.0.1:8000/extract/',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      const newData = extractResponse.data;
      console.log("Extract Response:", newData);

      // Step 2: Fetch the user's existing record
      const recordsResponse = await axios.get(
        'https://json-production-4a9d.up.railway.app/records'
      );

      const records = recordsResponse.data;
      console.log("Fetched Records:", records);

      // Step 3: Find the user record with matching userid
      const userRecord = records.find((record) => record.userid === user.sub);

      if (!userRecord) {
        console.error("No matching user found in records.");
        return;
      }

      // Step 4: Merge existing data with new data and add custom fields
      const updatedData = {
        ...userRecord,  // Keep all existing fields
        ...newData,     // Add/overwrite fields from the extracted data
        transactionId: generateTransactionId(), // Add random transaction ID
        blocknumber: generateBlockNumber(),     // Add random block number
        timestamp: getCurrentTimestamp()        // Add current timestamp
      };

      console.log("Merged Data with Extra Fields:", updatedData);

      // Step 5: Send a PUT request to update the user's record
      const putResponse = await axios.put(
        `https://json-production-4a9d.up.railway.app/records/${userRecord.id}`,
        updatedData, // Send the merged data with extra fields
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log("PUT Response:", putResponse.data);

      // Step 6: Close the modal after a successful operation
      setShowModal(false);
    } catch (error) {
      console.error("Error during upload or PUT request:", error);
    }
  };

  // Render the modal only if it is visible
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
