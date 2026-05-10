import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <>
    <div className="flex items-center justify-center mt-6">
      <div className="flex items-center gap-2 sm:gap-4">

        {/* Prev Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-white text-sm sm:text-base
            ${currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          Prev
        </button>

        {/* Page Info */}
        <span className="text-sm sm:text-base font-medium text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-white text-sm sm:text-base
            ${currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          Next
        </button>

      </div>
    </div>
    </>
  );
};

export default Pagination;