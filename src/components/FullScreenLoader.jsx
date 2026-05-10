const FullScreenLoader = ({ text = "Please wait..." }) => {
  return (
    <div className="
      fixed inset-0
      bg-white/30 backdrop-blur-sm
      flex flex-col items-center justify-center
      z-99
    ">

      <div className="
        w-12 h-12
        border-4 border-blue-700
        border-t-transparent
        rounded-full
        animate-spin
      " />

      <p className="mt-4 text-white dark:text-black text-sm">
        {text}
      </p>

    </div>
  );
};

export default FullScreenLoader;