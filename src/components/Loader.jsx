import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center py-16">
      <div
        className="
          h-20 w-20 
          rounded-3xl 
          bg-white/10 
          backdrop-blur-xl
          border border-white/20
          shadow-[0_8px_32px_rgba(0,0,0,0.45)]
          flex items-center justify-center
          animate-pulse
        "
      >
        <div className="loader-circle"></div>

        {/* Loader CSS */}
        <style>{`
          .loader-circle {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            border: 4px solid rgba(255,255,255,0.4);
            border-top-color: #ffffff;
            animation: spin 0.8s linear infinite;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}
