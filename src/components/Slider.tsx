"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";

const links = [
    { id: 1, 
      title: "always fresh & always crispy & always hot",
      image: "/slide1.png.png" },

    { id: 2,
      title: "we deliver your order wherever you are in NY",
      image: "/slide2.png.png" },

    { id: 3,
      title: "the best pizza to share with your family",
      image: "/slide3.png.jpg" },
];

const Slider = () => {
    const [currentSlide , setCurrentSlide] = useState(0)

    useEffect(() => {
        const interval = setInterval(
            () => setCurrentSlide((prev) => (prev === links.length - 1 ? 0 : prev + 1)),
            2000
        );
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-50">
            
            {/* TEXT CONTAINER */}
            <div className="flex-1 flex items-center justify-center flex-col gap-8 text-red-500 font-bold p-4 md:p-10" >
                {/* text-2xl: mobile par chota (2xl ya 3xl best hai)
                   md:text-5xl: tablet par bara
                   xl:text-7xl: desktop par pura bara
                   leading-tight: lines ke darmiyan overlap khatam karega
                */}
                <h1 className="text-2xl text-center uppercase md:text-5xl xl:text-7xl leading-tight">
                    {links[currentSlide].title}
                </h1>
                <button className="bg-red-500 text-white py-2 px-4 md:py-4 md:px-8 text-sm md:text-xl lg:text-2xl rounded-md">
                    Order Now
                </button>
            </div>

            {/* IMAGE CONTAINER */}
            <div className="w-full flex-1 relative">
                <Image src={links[currentSlide].image} alt="" fill className="object-cover"/>
            </div>
        </div>
    )
}

export default Slider;