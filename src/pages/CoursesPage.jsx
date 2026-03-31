import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { getAllCourses } from '../services/courses.service';
import { changeTitle } from '../util/util';

const CoursesPage = () => {
  // Sample course data
  changeTitle("LS - courses")
  const allCourses = [
    { id: 1, title: 'Introduction to React', category: 'Web Development', level: 'Beginner', duration: '10 hours', rating: 4.8, students: 1250, price: 49.99, image: 'https://via.placeholder.com/300x200?text=React' },
    { id: 2, title: 'Advanced JavaScript', category: 'Web Development', level: 'Advanced', duration: '15 hours', rating: 4.9, students: 980, price: 59.99, image: 'https://via.placeholder.com/300x200?text=JavaScript' },
    { id: 3, title: 'Python for Data Science', category: 'Data Science', level: 'Intermediate', duration: '20 hours', rating: 4.7, students: 2100, price: 69.99, image: 'https://via.placeholder.com/300x200?text=Python' },
    { id: 4, title: 'UI/UX Design Fundamentals', category: 'Design', level: 'Beginner', duration: '8 hours', rating: 4.6, students: 750, price: 39.99, image: 'https://via.placeholder.com/300x200?text=Design' },
    { id: 5, title: 'Mobile App Development with Flutter', category: 'Mobile', level: 'Intermediate', duration: '12 hours', rating: 4.5, students: 890, price: 54.99, image: 'https://via.placeholder.com/300x200?text=Flutter' },
    { id: 6, title: 'Machine Learning Basics', category: 'Data Science', level: 'Intermediate', duration: '18 hours', rating: 4.8, students: 1500, price: 79.99, image: 'https://via.placeholder.com/300x200?text=ML' },
    { id: 7, title: 'DevOps for Beginners', category: 'DevOps', level: 'Beginner', duration: '10 hours', rating: 4.4, students: 650, price: 49.99, image: 'https://via.placeholder.com/300x200?text=DevOps' },
    { id: 8, title: 'Advanced CSS and Sass', category: 'Web Development', level: 'Advanced', duration: '9 hours', rating: 4.7, students: 1100, price: 44.99, image: 'https://via.placeholder.com/300x200?text=CSS' },
  ];

  // State for filters and pagination
  const [courses,setCourses]=useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(4);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Available filters
  const categories = [...new Set(allCourses.map(course => course.category))];
  const levels = [...new Set(allCourses.map(course => course.level))];

  const fetchCourses=async()=>{
      const response=await getAllCourses();
      const data=await response.data;
      setCourses(data);
  }

  useEffect(() => {   
    fetchCourses();
  },[])

  // Filter courses based on selections
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category);
    const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level);
    const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  });

  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, selectedLevels, priceRange]);

  // Toggle category selection
  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Toggle level selection
  const toggleLevel = (level) => {
    setSelectedLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Mobile filters button */}
      <div className="md:hidden bg-white shadow-sm p-4">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <FiFilter className="mr-2" />
          Filters
        </button>
      </div>

      <div className="max-w-7xl mx-auto mt-20 px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-20">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
              
              {/* Search */}
              <div className="mb-6">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="search"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`category-${category}`}
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                      />
                      <label htmlFor={`category-${category}`} className="ml-3 text-sm text-gray-700">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Levels */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Levels</h3>
                <div className="space-y-2">
                  {levels.map((level) => (
                    <div key={level} className="flex items-center">
                      <input
                        id={`level-${level}`}
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={selectedLevels.includes(level)}
                        onChange={() => toggleLevel(level)}
                      />
                      <label htmlFor={`level-${level}`} className="ml-3 text-sm text-gray-700">
                        {level}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </h3>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full mb-2"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedLevels([]);
                  setPriceRange([0, 100]);
                  setSearchTerm('');
                }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Reset all filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search for mobile */}
            <div className="md:hidden mb-6">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Results count */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">
                {courses.length} {courses.length === 1 ? 'course' : 'courses'} found
              </h2>
            </div>

            {/* Courses Grid */}
            {currentCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="h-40 bg-gray-200 overflow-hidden">
                      <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                        <span className="text-lg font-semibold text-blue-600">${course.price}</span>
                      </div>
                      <div className="flex items-center mb-3">
                        <div className="flex items-center text-yellow-400 mr-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(course.rating) ? 'fill-current' : 'stroke-current'}`}
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={i < Math.floor(course.rating) ? 0 : 1}
                              />
                            </svg>
                          ))}
                        </div>
                        {/* <span className="text-sm text-gray-600">
                          {course.rating} ({course.students.toLocaleString()})
                        </span> */}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          {course.category}
                        </span>
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {course.level}
                        </span>
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                          {course.duration}
                        </span>
                      </div>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedLevels([]);
                    setPriceRange([0, 100]);
                    setSearchTerm('');
                  }}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Reset all filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    <span className="sr-only">Previous</span>
                    <FiChevronLeft className="h-5 w-5" />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    <span className="sr-only">Next</span>
                    <FiChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filters overlay */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setMobileFiltersOpen(false)} />
            <div className="relative bg-white w-80 max-w-xs h-full shadow-xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Close menu</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Mobile Filters Content */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <input
                          id={`mobile-category-${category}`}
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                        />
                        <label htmlFor={`mobile-category-${category}`} className="ml-3 text-sm text-gray-700">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Levels</h3>
                  <div className="space-y-2">
                    {levels.map((level) => (
                      <div key={level} className="flex items-center">
                        <input
                          id={`mobile-level-${level}`}
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={selectedLevels.includes(level)}
                          onChange={() => toggleLevel(level)}
                        />
                        <label htmlFor={`mobile-level-${level}`} className="ml-3 text-sm text-gray-700">
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </h3>
                  <div className="px-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full mb-2"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedLevels([]);
                    setPriceRange([0, 100]);
                    setSearchTerm('');
                  }}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Reset all filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;