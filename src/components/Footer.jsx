import { Link } from '@mui/material';
import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaLock } from 'react-icons/fa';

const Footer = () => {
  // In a real app, this would come from authentication context
  const isAdmin = true; 

  return (
    <footer className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-12 px-10">
      <div className="max-w-full mx-auto">
        {/* Main Footer Content */}
        <div className=" sm:flex  justify-between items-center md:items-center md:justify-beween  gap-5 md:gap-15 md:mb-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center">
              <span className="bg-white text-blue-700 rounded-lg p-2 mr-2">LS</span>
              LearnSphere
            </h3>
            <p className="text-blue-100">
              Empowering the next generation of learners through innovative education technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="GitHub" className="hover:text-blue-300 transition-colors">
                <FaGithub size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-blue-300 transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-blue-300 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="mailto:support@learnsphere.com" aria-label="Email" className="hover:text-blue-300 transition-colors">
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-blue-500 pb-2">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/courses" className="hover:text-blue-300 transition-colors">Courses</a></li>
              <li><a href="/pricing" className="hover:text-blue-300 transition-colors">Pricing</a></li>
              <li><a href="/blog" className="hover:text-blue-300 transition-colors">Blog</a></li>
              <li><a href="/success-stories" className="hover:text-blue-300 transition-colors">Success Stories</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-blue-500 pb-2">Resources</h4>
            <ul className="space-y-3">
              <li><a href="/help-center" className="hover:text-blue-300 transition-colors">Help Center</a></li>
              <li><a href="/privacy-policy" className="hover:text-blue-300 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-blue-300 transition-colors">Terms of Service</a></li>
              <li><a href="/contact" className="hover:text-blue-300 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Admin Section - Conditionally rendered */}
          {isAdmin && (
            <div className="bg-blue-800/30 md:p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-4 border-b border-blue-500 pb-2 flex items-center">
                <FaLock className="mr-2" /> Admin
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="/admin/dashboard" className="hover:text-blue-300 transition-colors flex items-center">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/admin/users" className="hover:text-blue-300 transition-colors flex items-center">
                    User Management
                  </a>
                </li>
                <li>
                  <a href="/admin/courses" className="hover:text-blue-300 transition-colors flex items-center">
                    Course Management
                  </a>
                </li>
                <li>
                  <a href="/admin/analytics" className="hover:text-blue-300 transition-colors flex items-center">
                    Analytics
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Copyright and Admin Notice */}
        <div className="pt-6 border-t border-blue-500 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-200 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} LearnSphere. All rights reserved.
          </p>
          
          
            <div className="flex items-center text-white text-sm">
              <FaLock className="mr-2" />
              <Link to="/admin" >Admin Login</Link>
            </div>
          
        </div>
      </div>
    </footer>
    
  );
};

export default Footer;