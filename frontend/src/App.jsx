import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [url, setUrl] = useState("");

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!file) return;
    (async () => {
      try {
        setIsloading(true);
        const formData = new FormData();
        formData.append("image", file);
        const res = await axios.post("/api/upload", formData);
        setUrl(res.data.url);
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
        setFile("");
      }
    })();
  }, [file]);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

  const handleDownload = async () => {
    const backendUrl = `/api/downloads?url=${encodeURIComponent(url)}`;
    window.location.href = backendUrl;
  };

  const handleUploadNew = () =>{
    setFile("");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex m-2  items-center gap-2 border-b border-[#dce4ed]">
        <img className="w-15" src="/logo.png" alt="" />
        <p className="text-lg font-semibold">Impage Upload</p>
      </div>
      <div className="flex flex-1 items-center justify-center">
        {!isLoading && !url && (
          <label
            htmlFor="forFiles"
            className="min-h-96 flex flex-col items-center justify-center md:w-1/2 md:mx-0 mx-10 w-full outline-5 outline-white border border-dashed border-[#c9c9c9] rounded shadow-2xl"
          >
            <input
              type="file"
              className="hidden"
              id="forFiles"
              onChange={handleFile}
            />
            <img src="/icon.png" alt="" className="w-30" />
            <p className="text-lg font-semibold">
              Drag & drop file or{" "}
              <span className="text-blue-400">Browse a file</span>
            </p>
            <p className="py-3">JPG, PNG or GIF - Max file size 2MB</p>
          </label>
        )}
        {isLoading && (
          <div className="min-h-96 flex flex-col items-center justify-center md:w-1/2 md:mx-0 mx-10 w-full outline-5 outline-white border border-dashed border-[#c9c9c9] rounded shadow-2xl px-10">
            <div
              className="h-2 bg-[#dce4ed] rounded-2xl flex items-center md:min-w-80 w-full"
              id="loader"
            >
              <span className="w-20 h-2 rounded-2xl bg-blue-400"></span>
            </div>
          </div>
        )}
        {url && (
          <div className="min-h-96 flex flex-col gap-10 items-center justify-center md:w-1/2 md:mx-0 mx-10 w-full outline-5 outline-white border border-dashed border-[#c9c9c9] rounded shadow-2xl">
            <img src={url} className="h-50" alt="" />
            <div className="flex flex-wrap gap-5 px-5">
              <button
                className="border border-[#dce4ed] px-10 py-1 rounded bg-blue-200 grow shrink"
                onClick={handleCopy}
              >
                Share
              </button>
              <button
                className="border border-[#dce4ed] px-10 py-1 rounded bg-blue-200 grow shrink"
                onClick={handleDownload}
              >
                Download
              </button>
              <button className="border border-[#dce4ed] px-10 py-1 rounded bg-blue-200 grow shrink" onClick={handleUploadNew}>
                Upload New
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
