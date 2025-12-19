import React, { useContext, useState } from "react";
import { globalContext } from "../Context/Global";
import axios from "axios";

function Currentcard() {
  const [data, setdata] = useContext(globalContext);
  const [loadingIndex, setLoadingIndex] = useState(null);

  const editTitle = (slideIndex, newTitle) => {
    setdata(prev =>
      prev.map((slide, idx) =>
        idx === slideIndex ? { ...slide, title: newTitle } : slide
      )
    );
  };

  const editPoint = (slideIndex, pointIndex, newValue) => {
    setdata(prev =>
      prev.map((slide, idx) => {
        if (idx !== slideIndex) return slide;
        const updatedPoints = [...slide.points];
        updatedPoints[pointIndex] = newValue;
        return { ...slide, points: updatedPoints };
      })
    );
  };

  const editExplanation = (slideIndex, expIndex, newValue) => {
    setdata(prev =>
      prev.map((slide, idx) => {
        if (idx !== slideIndex) return slide;
        const updated = [...slide.explanation];
        updated[expIndex] = newValue;
        return { ...slide, explanation: updated };
      })
    );
  };

  const newImg = async (curr) => {
    try {
      setLoadingIndex(curr);
      const title = data?.[curr]?.title;
      if (!title?.trim()) return;

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/regenerate/img`,
        { title }
      );

      const imageUrl = response.data?.query;
      if (!imageUrl) return;

      setdata(prev =>
        prev.map((slide, idx) =>
          idx === curr ? { ...slide, image: imageUrl } : slide
        )
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
     <div className="shrink-0">
      {data.map((elem, index) => (
        <div
          key={index}
          className="relative p-[2px] rounded-3xl mt-10 ml-5 w-[90%] overflow-hidden bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"
        >
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-8 rounded-3xl border border-white/5 flex flex-col">
            
            <div className="mb-6 pb-4 border-b border-white/10">
              <textarea
                rows={2}
                value={elem.title}
                onChange={(e) => editTitle(index, e.target.value)}
                className="w-[85%] resize-none bg-transparent outline-none text-[3.2rem] leading-tight font-black bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent break-words caret-white overflow-hidden"
                placeholder="Enter title..."
              />
            </div>

            <div className="flex gap-8 items-start">
              <div className="flex-1 flex flex-col gap-5 overflow-y-auto max-h-[420px] pr-2">
                {elem.points.map((point, idx) => (
                  <div key={idx} className="flex gap-4 items-start group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center mt-1 flex-shrink-0 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>

                    <div className="flex-1 min-w-0">
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => editPoint(index, idx, e.target.value)}
                        className="w-full bg-transparent outline-none font-bold text-lg text-white mb-1 placeholder-white/30 caret-white"
                        placeholder="Enter point..."
                      />
                      <textarea
                        rows={2}
                        value={elem.explanation[idx] ?? ""}
                        onChange={(e) => editExplanation(index, idx, e.target.value)}
                        className="w-full resize-none bg-transparent outline-none text-sm text-gray-300 leading-relaxed placeholder-gray-500 caret-white"
                        placeholder="Enter explanation..."
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-[42%] flex flex-col gap-4 flex-shrink-0">
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 rounded-2xl pointer-events-none" />
                  
                  <img
                    src={elem.image}
                    alt="slide"
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 border border-white/15 ${
                      loadingIndex === index ? "blur-md scale-105 opacity-40" : "group-hover:scale-105"
                    }`}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {loadingIndex === index && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md">
                      <div className="flex flex-col items-center gap-3">
                        <div className="relative w-12 h-12">
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-20 blur-lg animate-pulse" />
                          <svg className="w-12 h-12 animate-spin text-cyan-400" fill="none" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.2" />
                            <path d="M4 12a8 8 0 018-8V0C5.3 0 0 5.3 0 12h4z" fill="currentColor" />
                          </svg>
                        </div>
                        <span className="text-xs font-semibold text-white/70">Generating...</span>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => newImg(index)}
                  disabled={loadingIndex === index}
                  className={`py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    loadingIndex === index
                      ? "bg-white/5 text-gray-400 border border-white/10 cursor-not-allowed"
                      : "bg-gradient-to-r from-cyan-600 to-purple-600 text-white border border-white/20 hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:-translate-y-1"
                  }`}
                >
                  {loadingIndex === index ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Regenerate Image
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="border-t border-white/10 mt-8 pt-4 flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500" />
                <span className="font-semibold text-gray-400">Generated by SlideForge</span>
              </div>
              <span className="text-gray-400">{String(index + 1).padStart(2, '0')} / {String(data.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Currentcard;
