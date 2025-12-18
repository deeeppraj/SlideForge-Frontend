import React from "react";

function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center 
                    bg-black/60 backdrop-blur-md">
      <div className="flex flex-col items-center gap-5">
        
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full 
                          border-4 border-white/10" />
          <div className="absolute inset-0 rounded-full 
                          border-4 border-blue-500 border-t-transparent 
                          animate-spin" />
        </div>

        <p className="text-sm font-mono text-gray-300 tracking-wide">
          Generating content...
        </p>

      </div>
    </div>
  );
}

export default Loader;
