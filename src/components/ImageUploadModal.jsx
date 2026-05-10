import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { FaTimes } from "react-icons/fa";

const ImageUploadModal = ({ isOpen, onClose, uploadImage }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  // Create preview URL safely
  useEffect(() => {
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  if (!isOpen) return null;

  const handleUpload = () => {
    if (!file) return;
    uploadImage(file);
    onClose();
  };

  return (
    <div
      className="
        fixed inset-0
        bg-black/30
        backdrop-blur-sm
        flex items-center justify-center
        z-50
      "
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="
          bg-white
          w-full max-w-md
          rounded-2xl
          p-6 relative
        "
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          Upload Profile Image
        </h2>

        <div
          {...getRootProps()}
          className="
            border-2 border-dashed
            border-blue-400
            p-10 text-center
            rounded-xl
            cursor-pointer
          "
        >
          <input {...getInputProps()} />

          {file ? (
            <div className="flex flex-col items-center gap-3">
              <img
                src={preview}
                alt="preview"
                className="w-32 h-32 rounded-full object-cover border-2 border-blue-500"
              />
              <p className="text-sm text-gray-600">{file.name}</p>
            </div>
          ) : (
            <p>
              Drag & drop image here
              <br />
              or click to select
            </p>
          )}
        </div>

        <button
          onClick={handleUpload}
          disabled={!file}
          className="
            mt-6 w-full
            bg-blue-700 text-white
            py-3 rounded-lg
            disabled:opacity-50
          "
        >
          Upload
        </button>
      </motion.div>
    </div>
  );
};

export default ImageUploadModal;