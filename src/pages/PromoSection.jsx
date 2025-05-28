import React from "react";
import { useNavigate } from "react-router-dom";

const PromoSection = () => {
  const navigate = useNavigate();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div
        className="max-w-7xl mx-auto rounded-2xl px-6 md:px-12 py-12 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 text-white"
        style={{
          background: "linear-gradient(to right, rgb(45, 37, 134), rgb(7, 4, 33))",
        }}
      >
        {/* Left Content */}
        <div className="w-full lg:w-1/2">
          <p className="text-green-400 text-sm mb-2">Categories</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Enhance Your <br /> Music Experience
          </h2>

          {/* Countdown */}
          <div className="flex flex-wrap gap-4 mb-8">
            {[
              { label: "Hours", value: "23" },
              { label: "Days", value: "05" },
              { label: "Minutes", value: "59" },
              { label: "Seconds", value: "35" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white text-black rounded-xl w-20 h-20 flex flex-col items-center justify-center shadow-md"
              >
                <span className="font-bold text-lg">{item.value}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Button */}
          <button
            className="bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-md font-semibold text-white"
            onClick={() => navigate("/product")}
          >
            Buy Now
          </button>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2">
          <img
            src="/images/JBL_BOOMBOX_2_HERO_020_x1 (1) 1.png"
            alt="Product"
            className="w-full max-w-sm mx-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default PromoSection;
