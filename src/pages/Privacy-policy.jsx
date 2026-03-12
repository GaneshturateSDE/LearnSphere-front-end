import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-blue-700 min-h-screen py-16 px-6">
      
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-700 mb-4">
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your information when you use our platform.
        </p>

        <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-2">
          Information We Collect
        </h2>

        <p className="text-gray-700 mb-4">
          We may collect personal information such as your name, email address,
          and payment details when you register or purchase a course.
        </p>

        <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-2">
          How We Use Your Information
        </h2>

        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Provide access to courses</li>
          <li>Improve our platform</li>
          <li>Send updates and notifications</li>
          <li>Process payments</li>
        </ul>

        <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-2">
          Data Protection
        </h2>

        <p className="text-gray-700">
          We implement security measures to protect your data from unauthorized
          access or disclosure.
        </p>

      </div>
    </div>
  );
};

export default PrivacyPolicy;