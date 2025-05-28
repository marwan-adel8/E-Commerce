import React from "react";
import { useNavigate } from "react-router-dom";


const PromoSection = () => {
    const navigate = useNavigate();
  return (
    <div className="py-16 px-4">
      <div
        className="max-w-7xl mx-auto rounded-xl px-6 md:px-12 py-12 flex flex-col-reverse md:flex-row items-center justify-between gap-12 text-white"
        style={{
          background: "linear-gradient(to right,rgb(45, 37, 134),rgb(7, 4, 33))", // ← Gradient الخلفية
        }}
      >
        {/* النص والمحتوى */}
        <div className="flex-1">
          <p className="text-green-500 text-sm mb-2">Categories</p>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Enhance Your <br /> Music Experience
          </h2>

          {/* العد التنازلي */}
          <div className="flex gap-4 mb-8">
            {[
              { label: "Hours", value: "23" },
              { label: "Days", value: "05" },
              { label: "Minutes", value: "59" },
              { label: "Seconds", value: "35" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white text-black rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-md"
              >
                <span className="font-bold text-lg">{item.value}</span>
                <span className="text-xs font-semibold">{item.label}</span>
              </div>
            ))}
          </div>

          {/* زر */}
           <button
        className="bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-md font-semibold"
        onClick={() => navigate("/product")}
      >
        Buy Now
      </button>
        </div>

        {/* صورة المنتج */}
        <div className="flex-1">
          <img
            src="JBL_BOOMBOX_2_HERO_020_x1 (1) 1.png"
            alt="Product"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default PromoSection;
