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
      if (!title) return;

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
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <>
      {data.map((elem, index) => (
        <div
            key={index}
            className="relative p-[2px] rounded-2xl mt-10 ml-5 w-[90%]
                      bg-gradient-to-r from-blue-500 via-white to-blue-500
                      bg-[length:200%_200%]
                      animate-[borderFlow_6s_ease-in-out_infinite]"
          >
          <form
            className="bg-zinc-950 border border-white/10 text-white 
                       p-6 rounded-2xl shrink-0"
          >
            <input
              type="text"
              value={elem.title}
              onChange={(e) => editTitle(index, e.target.value)}
              className="w-full text-3xl font-bold text-center 
                         bg-transparent outline-none pb-4
                         border-b border-white/10
                         focus:border-blue-600"
            />

            <div className="flex gap-8 mt-6 items-start">
              <div className="flex flex-col gap-6 flex-1">
                {elem.points.map((point, idx) => (
                  <div key={idx} className="space-y-2">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) =>
                        editPoint(index, idx, e.target.value)
                      }
                      className="w-full bg-transparent outline-none 
                                 font-semibold text-xl font-serif
                                 border border-white/10 rounded-md px-3 py-1
                                 focus:border-blue-600"
                    />

                    <textarea
                      rows={2}
                      value={elem.explanation[idx]}
                      onChange={(e) =>
                        editExplanation(index, idx, e.target.value)
                      }
                      className="w-full bg-transparent outline-none 
                                 text-sm text-gray-300 font-mono
                                 border border-white/10 rounded-md px-3 py-2
                                 focus:border-blue-600 resize-none"
                    />
                  </div>
                ))}
              </div>

              <div className="w-[40%] flex flex-col gap-3">
                <div className="relative rounded-xl overflow-hidden h-[420px]">
                  <img
                    src={elem.image}
                    alt="slide visual"
                    className={`w-full h-full object-cover 
                      border border-white/10 transition-all ${
                        loadingIndex === index
                          ? "blur-sm opacity-60"
                          : ""
                      }`}
                  />

                  {loadingIndex === index && (
                    <div className="absolute inset-0 flex items-center justify-center 
                                    bg-black/40 backdrop-blur-sm">
                      <div className="h-8 w-8 border-2 border-blue-400 
                                      border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  disabled={loadingIndex === index}
                  onClick={() => newImg(index)}
                  className={`text-sm font-bold border rounded-lg p-2 transition ${
                    loadingIndex === index
                      ? "text-gray-400 border-white/10 cursor-not-allowed"
                      : "text-blue-400 hover:text-blue-300 hover:bg-blue-700 border-white/10"
                  }`}
                >
                  {loadingIndex === index ? "Generating..." : "Regenerate Image"}
                </button>
              </div>
            </div>
          </form>
        </div>
      ))}
    </>
  );
}

export default Currentcard;
