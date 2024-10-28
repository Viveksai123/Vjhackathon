import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import './Page.css'; // Ensure your CSS file is imported

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
        console.log('Form submitted:', formData);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-800 to-blue-400 text-white items-center justify-center p-6">
                <div className="space-y-6 text-center">
                    <h3 className="text-3xl font-bold">Get in Touch</h3>
                    <p className="text-lg">We’d love to hear from you! Whether you’re curious about features, or even need help – we’re ready to answer any and all questions.</p>
                    <div className="space-y-4">
                        <p className="flex items-center justify-center space-x-2">
                            <FaPhone className="text-2xl" />
                            <span>(+123) 456-7890</span>
                        </p>
                        <p className="flex items-center justify-center space-x-2">
                            <FaEnvelope className="text-2xl" />
                            <span>support@yourcompany.com</span>
                        </p>
                        <p className="flex items-center justify-center space-x-2">
                            <FaMapMarkerAlt className="text-2xl" />
                            <span>123 Your Street, City, Country</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center w-full md:w-1/2 bg-white relative">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-6 right-6 text-gray-600 hover:text-gray-900"
                    aria-label="Close"
                >
                    <FaTimes size={24} />
                </button>
                <div className="w-full max-w-lg p-8">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Contact Us</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="block w-full py-2.5 text-gray-800 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 placeholder-transparent peer"
                                placeholder="Name"
                            />
                            <label
                                htmlFor="name"
                                className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-600"
                            >
                                Name
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="block w-full py-2.5 text-gray-800 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 placeholder-transparent peer"
                                placeholder="Email"
                            />
                            <label
                                htmlFor="email"
                                className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-600"
                            >
                                Email
                            </label>
                        </div>
                        <div className="relative">
                            <textarea
                                name="message"
                                id="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="block w-full py-2.5 text-gray-800 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 placeholder-transparent peer"
                                placeholder="Message"
                            ></textarea>
                            <label
                                htmlFor="message"
                                className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-600"
                            >
                                Message
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
