import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { getAllCourses } from '../services/courses.service';
import { changeTitle } from '../util/util';
import { useNavigate } from 'react-router-dom';
import { useLoader } from '../contexts/LoaderContext';
import { set } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { CATEGORIES, LEVELS } from '../constants/user.constant';
import Pagination from '../components/Pagination';
import { FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cart/cartSlice';
import { toast } from 'react-toastify';



const CoursesPage = () => {
  // Sample course data
  changeTitle("LS - courses")


  // State for filters and pagination
  const [courses,setCourses]=useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [coursesPerPage,setCoursesPerPage] = useState(4);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const {setLoader}=useLoader();
  const dispatch=useDispatch()
  const {items}=useSelector(state=>state.cart);
  // Available filters
 

  const {user}=useAuth();
const fetchCourses = async () => {

  setLoader(true);

  try {
    const params = {
      search: searchTerm || undefined,
      categories: selectedCategories.length ? selectedCategories.join(",") : undefined,
      levels: selectedLevels.length ? selectedLevels.join(",") : undefined,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      page: currentPage ,
      limit: coursesPerPage
    };

   

    const response = await getAllCourses(params);
    const data = response.data;
    console.log("Fetched courses data:", data);
    setTotalPages(response.totalPages);
    setCurrentPage(response.currentPage);
    const enrolledSet = new Set(user?.coursesId?.map(String) || []);

    setCourses(
      data.map(course => ({
        ...course,
        enrolled: enrolledSet.has(String(course.id)),
        inCart: items.some(i => i.id === course.id)
      }))
    );

  } catch (e) {
    console.error(e);
  }

  setLoader(false);
};

const addCart=(course)=>{ 
          dispatch(addToCart(course))
          if(course.enrolled)
            toast.success("added in cart");
           else
            toast.error("removed from cart");
}


  useEffect(() => {   
  
    fetchCourses();
  
  },[searchTerm, selectedCategories, selectedLevels, priceRange, currentPage,coursesPerPage]);

  

  
  

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, selectedLevels, priceRange]);

  const naviagtion=useNavigate()
  // Toggle category selection
  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const enrollCourse=(courseId)=>{
      naviagtion(`/courses/${courseId}`)
  }

  // Toggle level selection
  const toggleLevel = (level) => {
    setSelectedLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full">
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

      <div className="w-full mx-auto mt-20 px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8 w-full">
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

              <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Items per page</h3>
                      <select
                        value={coursesPerPage}
                        onChange={(e) => setCoursesPerPage(parseInt(e.target.value))}
                        className="w-1/2 border px-6 py-2 rounded"
                      >
                        
                        <option value={4}>4</option>
                  
                        <option value={8}>8</option>
                        <option value={20}>20</option>
                      </select>
                    
              </div>
                

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
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
                  {LEVELS.map((level) => (
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
          <div className="flex flex-col justify-between w-full">
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
            {/* <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">
                {courses.length} {courses.length === 1 ? 'course' : 'courses'} found
              </h2>
            </div> */}

            {/* Courses Grid */}
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {courses.map((course) => (
                  <div key={course.id}  className="bg-white rounded-lg cursor-pointer shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="max-h-60 bg-gray-200 overflow-hidden">
                      
                      <img onClick={()=>enrollCourse(course.id)} src={course.thumbnailUrl} alt={course.title} className="h-full w-full object-cover" />
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
                        {course.category && <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          {course.category}
                        </span>}
                       {course.level && <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {course.level}
                        </span>}
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                          {parseInt(course.durationInMin/60)+" hrs "+course.durationInMin%60+" min "}
                        </span>
                      </div>
                      <div className='flex justify-around items-center w-full'>
                        {!course.enrolled && <div className='px-1 py-2 flex items-center justify-around gap-2 text-sm text-gray-600 border rounded   w-1/3'>
                           <button onClick={()=>addCart(course)} className='flex gap-3 items-center cursor-pointer '>{course.inCart?"REMOVE":"ADD TO CART"}<FaShoppingCart size={18}/></button>
                          
                         </div>}
                         <div className={`${course.enrolled ? 'w-full' : 'w-1/3'}`}>  
                      <button disabled={course.enrolled}  onClick={()=>enrollCourse(course.id)}  className={`w-full ${course.enrolled ? 'bg-gray-400 hover:bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-2 px-2 cursor-pointer rounded-md transition duration-200`}>
                        {course.enrolled?"Enrolled":"Enroll Now"}
                      </button>
                         </div>
                      </div>
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
            <div className='flex justify-center mt-5 '>

            {totalPages > 1 && (
              <Pagination  totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
            )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filters overlay */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen">
            <div className="fixed inset-0 bg-white/30 bg-opacity-25" onClick={() => setMobileFiltersOpen(false)} />
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
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Items per page</h3>
                      <select
                        value={coursesPerPage}
                        onChange={(e) => setCoursesPerPage(parseInt(e.target.value))}
                        className="w-1/2 border px-9 py-2 rounded"
                      >
                        
                        <option value={4}>4</option>
                  
                        <option value={8}>8</option>
                        <option value={12}>20</option>
                      </select>
                    
              </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
                  <div className="space-y-2">
                    {CATEGORIES.map((category) => (
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
                    {LEVELS.map((level) => (
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