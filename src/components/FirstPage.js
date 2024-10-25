import React from 'react';
import { useNavigate } from 'react-router-dom';

const FirstPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/second-page');
  };

  const handleButtonClick1 = () => {
    navigate('/policesecond-page');
  };
  const handleButtonClick2 = () => {
    navigate('/tgspdcsecond-page');
  };
  const handleButtonClick3 = () => {
    navigate('/twalletsecond-page');
  };
  const handleButtonClick4 = () => {
    navigate('/ghmcsecond-page');
  };
  const handleButtonClick5= () => {
    navigate('/hmwssbsecond-page');
  };
  const handleButtonClick6 = () => {
    navigate('/cmdasecond-page');
  };
  const handleButtonClick7 = () => {
    navigate('/endowmentsecond-page');
  };


  return (
    <div className="p-6 m-6">
      
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Go to Second Page
      </button>
      <button
        onClick={handleButtonClick1}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Go to Police
      </button>
      <button
        onClick={handleButtonClick2}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Go to tgspdc
      </button>
      <button
        onClick={handleButtonClick3}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Go to twallet
      </button>
      <button
        onClick={handleButtonClick4}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Go to ghmc.json
      </button>
      <button
        onClick={handleButtonClick5}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Go to hmwssb
      </button>
      <button
        onClick={handleButtonClick6}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Go to cmda
      </button>
      <button
        onClick={handleButtonClick7}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Go to endowment
      </button>
    </div>
  );
};

export default FirstPage;
