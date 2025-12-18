import React from "react";

function ExportLoader() {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm 
                    flex items-center justify-center">
      <div className="bg-zinc-900 border border-white/10 
                      rounded-2xl p-8 flex flex-col items-center gap-4">
        
        <div className="h-10 w-10 border-2 border-blue-500 
                        border-t-transparent rounded-full animate-spin" />
        
        <p className="text-white font-semibold tracking-wide">
          Generating your presentation…
        </p>

        <p className="text-gray-400 text-sm">
          This may take a few seconds
        </p>
      </div>
    </div>
  );
}

export default ExportLoader;
