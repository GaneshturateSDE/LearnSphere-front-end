import { FaTrash } from "react-icons/fa";

const Course = ({ course, handleDelete, handleDetails }) => {
  return (
    <div className="bg-white p-5 relative shadow-md border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition duration-300 hover:cursor-pointer">
      <FaTrash
        color="gray"
        size={18}
        onClick={() => handleDelete(value.id)}
        className="absolute right-1 top-0.5 "
      />
     <div key={course.id} onClick={()=>handleDetails(course.id)} className="bg-white rounded-lg cursor-pointer shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="h-40 bg-gray-200 overflow-hidden">
                      
                      <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />
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
                      <button   className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 cursor-pointer rounded-md transition duration-200`}>
                          Update Course
                      </button>
                    </div>
                  </div>
    </div>
  );
  
};

export default Course;
