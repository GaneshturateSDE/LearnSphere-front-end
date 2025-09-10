import React from 'react';

const Course = ({ title, desc, img }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300">
            <img src={img} alt={title} className="w-full h-40 object-cover" />
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
            </div>
        </div>
    );
};

export default Course;
