import React, { useContext, useState } from "react";
import { globalContext } from "../Context/Global";
import axios from "axios";


function Navbar(props) {

  const [globdata,setglobData] = useContext(globalContext)
  const [exporting, setExporting] = useState(false);


  async function exportPPT(globdata, setExporting) {
  try {
    setExporting(true);

    const response = await axios.post(
      "http://127.0.0.1:8000/export/ppt",
      globdata,
      { responseType: "blob" }
    );

    const blob = new Blob(
      [response.data],
      { type: "application/vnd.openxmlformats-officedocument.presentationml.presentation" }
    );

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "presentation.pptx";
    a.click();
    window.URL.revokeObjectURL(url);

  } catch (err) {
    console.error(err);
  } finally {
    setExporting(false);
  }
}

  return (
    <div className="flex items-center gap-3 px-6 pt-3 pb-3
                    border-b border-white/10 
                    text-white rounded-xl">
      
      <img
        src="/icon.png"
        alt="SlideForge logo"
        className="h-12 w-12 rounded"
      />

      <div className="flex flex-col leading-tight">
        <h2 className="text-2xl font-extrabold font-mono">
          SlideForge
        </h2>
        <p className="text-sm text-gray-400 font-serif">
          From prompts to presentation
        </p>
      </div>

      <div className="pl-250">
       <button
            onClick={() => exportPPT(globdata, setExporting)}
            disabled={exporting}
            style={{opacity:(props.val == 'input' || props.val == 'loader')?0:1}}
            className={`px-4 py-2 rounded-lg font-semibold transition
              ${exporting
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"}
            `}
          >
            {exporting ? "Exporting…" : "Export PPT"}
          </button>
      </div>


    </div>
  );
}

export default Navbar;
