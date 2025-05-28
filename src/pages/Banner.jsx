import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const images = [
  "/images/pexels-kaip-996329.jpg",
  "/images/pexels-nurseryart-354103.jpg",
  "/images/pexels-karolina-grabowska-5632346.jpg",
];



const Banner = () => {
  return (
    <div className="w-full mt-16">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-full h-[60vh] rounded-lg shadow-lg"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-[60vh] relative overflow-hidden rounded-lg">
              <img
                src={img}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover object-center"
              />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white text-center px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in">
                 Best deals this week
                </h2>
             <Link to="/shop">
  <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition duration-300 animate-fade-in delay-200">
    shop now
  </button>
</Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
