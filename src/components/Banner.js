import React, { useState } from "react";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { banner1, banner2, banner3 } from "../assets/banners/banner";

function Banner() {
  const banners = [
    <img
      key="banner1"
      className="w-screen h-full object-cover"
      loading="priority"
      src={banner1}
      alt="banner1"
    />,

    <img
      key="banner2"
      className="w-screen h-full object-cover"
      src={banner2}
      alt="banner2"
    />,

    <img
      key="banner3"
      className="w-screen h-full object-cover"
      src={banner3}
      alt="banner3"
    />,
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? banners.length - 1 : currentSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === banners.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <div className="w-full h-auto overflow-x-hidden">
      <div className="w-screen h-[500px] relative">
        <div
          style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
          className="w-[400vw] h-full flex transition-transform duration-1000"
        >
          {banners.map((banner, index) => (
            <div key={index} className="w-screen h-full object-cover">
              {banner}
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 left-0 right-0 mx-auto flex items-center justify-center">
          <div
            onClick={prevSlide}
            className="w-12 h-12 border border-gray-700 flex items-center justify-center rounded cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200 hover:text-gray-900 active:bg-gray-400 mr-2"
          >
            <FaArrowCircleLeft className="w-6 h-6" />
          </div>
          <div
            onClick={nextSlide}
            className="w-12 h-12 border border-gray-700 flex items-center justify-center rounded cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200 hover:text-gray-900 active:bg-gray-400 ml-2"
          >
            <FaArrowCircleRight className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
