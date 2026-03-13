/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import { FaChalkboardTeacher, FaVideo, FaUsers, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Course from '../components/Course';
import { Link } from 'react-router';
import { getAllCourses } from '../services/courses.service';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};



const LandingPage = () => {
  // const courses = [
  //   {
  //     title: "React for Beginners",
  //     desc: "Learn the basics of React and build your first application.",
  //     img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  //   },
  //   {
  //     title: "Java with Spring Boot",
  //     desc: "Master backend development with Spring framework.",
  //     img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  //   },
  //   {
  //     title: "DSA Mastery",
  //     desc: "Crack coding interviews with comprehensive DSA training.",
  //     img: "https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  //   }
  // ];
   document.title = "LearnSphere - Empower Your Learning Journey";
  const [courses,setCourses]=useState([]);
  
const fetchCourses = async () => {
   document.title = "LearnSphere - Empower Your Learning Journey";
      const fetchedCourses = await getAllCourses();
      const data=await fetchedCourses.data;
      setCourses(data);
    };

  useEffect(() => {
       fetchCourses();
  }, []);

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Frontend Developer",
      feedback: "LearnSphere transformed my career! The mentorship and projects helped me crack my dream job.",
      img: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Rohan Patel",
      role: "Backend Engineer",
      feedback: "Very well-structured courses. The DSA track especially helped me prepare for interviews.",
      img: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Sneha Reddy",
      role: "Full Stack Developer",
      feedback: "The community and support system is amazing. You never feel alone in your learning journey.",
      img: "https://randomuser.me/api/portraits/women/65.jpg"
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 to-blue-700 py-20 md:py-28 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy.dev/images/noise.png')]"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Empower Your <span className="text-yellow-300">Learning Journey</span> with LearnSphere
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Discover top courses, expert mentors, and a supportive community to boost your career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to={"courses"}>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg flex items-center gap-2"
              >
                Explore Courses <FaArrowRight />
              </motion.button>
            </Link>
            <a href='#features'>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black hover:bg-opacity-10 transition-all duration-300"
              >
                Learn More
              </motion.button>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-6"
          >
            Why Choose <span className="text-blue-600">LearnSphere?</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 text-center max-w-2xl mx-auto mb-12 text-lg"
          >
            We provide the best learning experience with cutting-edge technology and expert guidance.
          </motion.p>
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div 
              variants={item}
              className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaChalkboardTeacher className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Mentors</h3>
              <p className="text-gray-600">
                Learn from industry professionals with years of real-world experience and proven teaching methods.
              </p>
            </motion.div>
            
            <motion.div 
              variants={item}
              className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaVideo className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Interactive Lessons</h3>
              <p className="text-gray-600">
                Engaging video content with hands-on exercises, quizzes, and real projects for practical learning.
              </p>
            </motion.div>
            
            <motion.div 
              variants={item}
              className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUsers className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Support</h3>
              <p className="text-gray-600">
                Join our vibrant community of learners, get help from peers, and participate in coding challenges.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-16 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-blue-600">Popular Courses</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Hand-picked courses designed to take you from beginner to job-ready
            </p>
          </motion.div>
          
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {courses.map((course, index) => (
              <motion.div 
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Course
                  title={course.title}
                  desc={course.desc}
                  img={course.img}
                />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center mt-12"
          >
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium flex items-center gap-2 mx-auto">
              View All Courses <FaArrowRight />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="text-blue-600">Learners Say</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Don't just take our word for it - hear from our students
            </p>
          </motion.div>
          
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((t, index) => (
              <motion.div 
                key={index}
                variants={item}
                className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-200"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">{t.name}</h4>
                    <p className="text-blue-600 text-sm">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">"{t.feedback}"</p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Transform Your Career?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg mb-8 max-w-2xl mx-auto text-blue-100"
          >
            Join thousands of learners who have accelerated their careers with LearnSphere
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to={"/courses"} className="px-8 py-4 w-1/2 md:w-1/4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300 font-semibold shadow-lg flex items-center gap-2 mx-auto">
              Get Started Today <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;