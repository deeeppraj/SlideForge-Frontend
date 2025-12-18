import React from "react";

function Footer() {
  return (
    <footer className="absolute bottom-0 
    mt-8 border-t border-white/10 text-gray-400 flex w-screen justify-around
    ">
      <div className="flex flex-col sm:flex-row 
                      items-center justify-between 
                      px-6 py-4 gap-9">
        
        <p className="text-sm font-mono">
          © {new Date().getFullYear()} SlideForge
        </p>

        <p className="text-sm font-serif">
          Built with ❤️ by Deepraj
        </p>

      </div>
    </footer>
  );
}

export default Footer;
