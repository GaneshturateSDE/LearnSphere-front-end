import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import userService from '../services/user.service';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const mobileMenuRef = useRef(null);

    const {user} = useAuth();

    
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when clicking outside or scrolling
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                // Check if the click is not on the hamburger button
                if (!event.target.closest('button[aria-label="Toggle menu"]')) {
                    setIsOpen(false);
                }
            }
        };

        const handleScroll = () => {
            if (isOpen) {
                setIsOpen(false);
            }
        };   

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isOpen]);
const getProfile=async()=>{
    try {
        
        const data=await userService.getProfile();
        // storeUser(data.user)
    } catch (error) {
        console.error("Error fetching profile:", error);
    }
}
    useEffect(() => {
        getProfile()
    }, []);
    

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-3' : 'bg-white shadow-md py-4'}`}>
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200">
                        LearnSphere
                    </Link>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <ul className="flex space-x-8">
                            <li>
                                <Link 
                                    to="/courses" 
                                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                                >
                                    Courses
                                </Link>
                            </li>
                           
                        </ul>

                        {/* Buttons */}
                       {!user && <div className="ml-8 flex space-x-4">
                            <Link 
                                to="/login" 
                                className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg px-4 py-2 text-center transition-all duration-300 font-medium"
                            >
                                Login/Signup
                            </Link>
                        </div>}
                    </div>

                    {/* Hamburger Button */}
                    <button
                        className="md:hidden text-blue-600 text-2xl focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile menu */}
                <div 
                    ref={mobileMenuRef}
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}
                >
                    <div className="bg-white rounded-lg shadow-lg px-6 py-4 flex flex-col space-y-4">
                        <Link 
                            to="/courses" 
                            className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-4 py-2 transition-all duration-200"
                            onClick={() => setIsOpen(false)}
                        >
                            Courses
                        </Link>
                      
                        <Link 
                            to="/login" 
                            className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg px-4 py-2 text-center transition-all duration-300 font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Login/Signup
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;