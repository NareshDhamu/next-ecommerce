"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Explore the Mountains",
    description:
      "Discover the serene beauty of the majestic mountains and find your inner peace.",
    image:
      "https://images.pexels.com/photos/4049876/pexels-photo-4049876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "Sunset Bliss",
    description:
      "Experience the tranquil beauty of a sunset over the rolling hills.",
    image:
      "https://images.pexels.com/photos/4050388/pexels-photo-4050388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 3,
    title: "Forest Pathway",
    description:
      "Take a walk through the lush forest and breathe in the fresh air of nature.",
    image: "https://images.pexels.com/photos/3756345/pexels-photo-3756345.jpeg",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 4,
    title: "Serene Lake",
    description: "Find peace and calm by the tranquil waters of a serene lake.",
    image:
      "https://images.pexels.com/photos/3794178/pexels-photo-3794178.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`}
            key={slide.id}
          >
            <div className="h-1/2 xl:h-full xl:w-1/2 flex-col justify-center flex items-center gap-8 2xl:gap-12 text-center ">
              <h1 className="text-4xl lg:text-5xl 2xl:text-7xl font-semibold">
                {slide.title}
              </h1>
              <h2 className="text-xl lg:text-3xl 2xl:text-4xl px-8">
                {slide.description}
              </h2>
              <Link href={slide.url}>
                <button className="rounded-md bg-black text-white py-3 px-4">
                  Shop Now
                </button>
              </Link>
            </div>
            <div className=" h-1/2 xl:w-1/2 xl:h-full relative">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="100%"
                className="object-cover md:object-right-bottom"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center">
        <div className=" absolute bottom-5 flex gap-4 bg-white px-3 py-2 rounded-full">
          {slides.map((slide, index) => (
            <div
              className={`w-2.5 h-2.5 rounded-full ring-1 ring-green-600 cursor-pointer flex items-center justify-center ${
                current === index ? "scale-150" : ""
              }`}
              key={slide.id}
              onClick={() => setCurrent(index)}
            >
              {current === index && (
                <div className="w-[7px] h-[7px] rounded-full bg-green-600"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
