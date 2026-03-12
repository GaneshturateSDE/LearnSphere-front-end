import React from "react";

const TermsOfService = () => {
  return (
    <div className="bg-blue-700 min-h-screen py-16 px-6">
      
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Terms of Service
        </h1>

        <p className="text-gray-700 mb-4">
          By using our platform, you agree to the following terms and
          conditions.
        </p>

        <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-2">
          Account Responsibility
        </h2>

        <p className="text-gray-700 mb-4">
          Users are responsible for maintaining the confidentiality of their
          account credentials.
        </p>

        <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-2">
          Course Usage
        </h2>

        <p className="text-gray-700 mb-4">
          Courses are for personal learning purposes only. Redistribution or
          resale of course materials is prohibited.
        </p>

        <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-2">
          Payments and Refunds
        </h2>

        <p className="text-gray-700 mb-4">
          All payments must be completed before accessing paid courses. Refund
          policies may vary depending on the course.
        </p>

        <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-2">
          Changes to Terms
        </h2>

        <p className="text-gray-700">
          We reserve the right to update these terms at any time. Continued use
          of the platform indicates acceptance of the updated terms.
        </p>

      </div>
    </div>
  );
};

export default TermsOfService;