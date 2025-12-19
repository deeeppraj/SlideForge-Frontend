import React, { useContext, useState } from "react";
import { globalContext } from "../Context/Global";

function SidebarPreview() {
  const [data] = useContext(globalContext);

  const [activeSlide, setActiveSlide] = useState();

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6 px-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <image src ="icon.png" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white ">All Slides:</h2>
      </div>

      <div className="flex flex-col gap-3">
        {data.map((elem, idx) => (
          <div
            key={idx}
            // onClick={() => setActiveSlide(idx)}
            className={`relative p-[1.5px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 group ${
              activeSlide === idx
                ? "bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"
                : "bg-gradient-to-r from-white/10 via-white/5 to-white/10 hover:from-white/20 hover:via-white/15 hover:to-white/20"
            }`}
          >
            <div className={`rounded-2xl p-4 text-white transition-all duration-300 ${
              activeSlide === idx
                ? "bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950"
                : "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 hover:bg-slate-900/80"
            }`}>
              <div className="flex gap-4 items-start">
                <div className="w-[100px] h-[70px] rounded-xl overflow-hidden border border-white/15 flex-shrink-0 group-hover:border-cyan-400/50 transition-all duration-300">
                  <img
                    src={elem.image}
                    alt="slide-preview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-400 mb-1">
                    Slide {String(idx + 1).padStart(2, '0')}
                  </p>
                  <h3 className={`font-bold truncate mb-2 transition-all duration-300 ${
                    activeSlide === idx
                      ? "text-transparent bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-lg"
                      : "text-white text-base"
                  }`}>
                    {elem.title}
                  </h3>
                </div>

                {activeSlide === idx && (
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SidebarPreview;
