import { FaTrash } from "react-icons/fa";

const Course = ({ value, handleDelete, handleDetails }) => {
  return (
    <div className="bg-white p-5 relative shadow-md border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition duration-300 hover:cursor-pointer">
      <FaTrash
        color="gray"
        size={18}
        onClick={() => handleDelete(value.id)}
        className="absolute right-1 top-0.5 "
      />
      <div onClick={()=>handleDetails(value.id)}>
        <img
          src={value.imageUrl || ""}
          alt={value.title}
          className="w-full h-40 object-cover border rounded-2xl border-gray-300"
        />
        <div className="p-4">
          <div className="flex  justify-between">
          <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
            <h3 className="text-xl font-light">{parseInt(value.durationInMin/60)+" hrs "+value.durationInMin%60+" min "}</h3>
          </div>
          <p className="text-gray-600">{value.description}</p>
        </div>
      </div>
    </div>
  );
  
};

export default Course;
