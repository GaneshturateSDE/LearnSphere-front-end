import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import { FaTimes } from "react-icons/fa";
import { useDropzone } from "react-dropzone";

const TutorialModal = ({ isOpen, onClose, handleTutorials }) => {
  const { register, handleSubmit,reset } = useForm();
  const [file, setFile] = React.useState(null);

  
  const onDrop = (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    };
    
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });
    
    const onSubmit = (data) => {
        console.log("Tutorial:", data, file);
        handleTutorials(data)
        reset()
        onClose();
    };
    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex justify-center items-center z-50">

      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-white w-full max-w-md p-6 rounded shadow relative"
      >

        <button onClick={onClose} className="absolute top-3 right-3">
          <FaTimes />
        </button>

        <h2 className="text-xl font-bold text-blue-700 mb-4">
          Add Tutorial
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <input
            {...register("title")}
            placeholder="Tutorial Title"
            className="w-full border p-3 rounded"
          />

          <textarea
            {...register("content")}
            placeholder="Content"
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            {...register("orderIndex")}
            placeholder="Order Index"
            className="w-full border p-3 rounded"
          />

          {/* File Upload */}
          <div
            {...getRootProps()}
            className="border-2 border-dashed p-4 text-center rounded cursor-pointer"
          >
            <input {...getInputProps()} />
            {file ? <p>{file.name}</p> : <p>Upload Resource File</p>}
          </div>

          <button className="w-full bg-blue-700 text-white py-2 rounded">
            Save Tutorial
          </button>

        </form>

      </motion.div>
    </div>
  );
};

export default TutorialModal;