import React, { useContext } from "react";
import { globalContext } from "../Context/Global";

function SidebarPreview() {
  const [data] = useContext(globalContext);

  return (
    <div className="flex flex-col gap-4">
      {data.map((elem, idx) => (
        <div
          key={idx}
          className="bg-zinc-900/70 border border-white/10 
                     rounded-xl p-4 text-white
                     hover:border-blue-500/40
                     transition-all duration-200"
        >
          <h3 className="text-sm font-semibold text-blue-400 
                         truncate mb-3">
            {elem.title}
          </h3>

          <div className="flex gap-3">
            <div className="flex flex-col gap-2 flex-1">
              {elem.points.map((point, i) => (
                <p
                  key={i}
                  className="text-xs text-gray-300 
                             bg-white/5 border border-white/10
                             rounded-md px-2 py-1
                             truncate"
                >
                  {point}
                </p>
              ))}
            </div>

            <div className="w-[90px] h-[60px] rounded-lg overflow-hidden 
                            border border-white/10 shrink-0">
              <img
                src={elem.image}
                alt="slide-preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SidebarPreview;
