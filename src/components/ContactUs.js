// src/components/ContactUs.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import './Page.css'; // Make sure your CSS file is imported

const ContactUs = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle form submission, like sending to an API
        console.log('Form submitted:', formData);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                    aria-label="Close"
                >
                    <FaTimes size={20} />
                </button>
                <h2 className="text-2xl font-semibold text-center mb-6">Contact Us</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="message">Message</label>
                        <textarea
                            name="message"
                            id="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Send Message
                    </button>
                </form>
            </div>
            <div className="mt-6 text-center">
                <h3 className="font-semibold">Contact Information</h3>
                <p className="flex items-center justify-center space-x-2">
                    <FaPhone className="text-blue-600" />
                    <span>(+123) 456-7890</span>
                </p>
                <p className="flex items-center justify-center space-x-2">
                    <FaEnvelope className="text-blue-600" />
                    <span>support@yourcompany.com</span>
                </p>
                <p className="flex items-center justify-center space-x-2">
                    <FaMapMarkerAlt className="text-blue-600" />
                    <span>123 Your Street, City, Country</span>
                </p>
            </div>
        </div>
    );
};

export default ContactUs;
