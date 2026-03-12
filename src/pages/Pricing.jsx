import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      features: [
        { text: "Access to basic courses", available: true },
        { text: "Community support", available: true },
        { text: "Certificate", available: false },
        { text: "1:1 Doubt Session", available: false },
      ],
    },
    {
      name: "Basic",
      price: "₹499",
      features: [
        { text: "Access to all courses", available: true },
        { text: "Community support", available: true },
        { text: "Certificate", available: true },
        { text: "1:1 Doubt Session", available: false },
      ],
    },
    {
      name: "Advance",
      price: "₹999",
      features: [
        { text: "Access to all courses", available: true },
        { text: "Community support", available: true },
        { text: "Certificate", available: true },
        { text: "1:1 Doubt Session", available: true },
      ],
    },
  ];

  return (
    <div className="bg-blue-700 min-h-screen py-16 px-6">
      <h1 className="text-4xl font-bold text-center text-white mb-12">
        Course Pricing
      </h1>

      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-8 flex flex-col"
          >
            <h2 className="text-2xl font-bold text-blue-700 text-center">
              {plan.name}
            </h2>

            <p className="text-4xl font-bold text-center my-6 text-gray-800">
              {plan.price}
            </p>

            <ul className="space-y-4 flex-1">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  {feature.available ? (
                    <FaCheckCircle className="text-green-500" size={20} />
                  ) : (
                    <FaTimesCircle className="text-red-500" size={20} />
                  )}
                  <span className="text-gray-700">{feature.text}</span>
                </li>
              ))}
            </ul>

            <button className="mt-8 bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition">
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;