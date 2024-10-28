// ProfileModal.js
const ProfileModal = ({ user, userPhoneNumber, applicationStatus, documentVerification, toggleProfile, logout }) => (
    <div className="fixed top-16 right-6 w-80 max-h-96 bg-white rounded-lg shadow-lg p-4 z-50 overflow-y-auto"> 
      <button onClick={toggleProfile} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" aria-label="Close Profile">
        <FaTimes size={18} />
      </button>
      <div className="flex flex-col items-center">
        <img src={user.picture} alt={user.name} className="w-24 h-24 rounded-full object-cover mb-4" />
        <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
        <p className="text-gray-600">{userPhoneNumber}</p>
        {/* Additional Profile Content */}
        <button onClick={() => logout({ returnTo: window.location.origin })} className="mt-6 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700">
          Logout
        </button>
      </div>
    </div>
  );
  
  export default ProfileModal;
  