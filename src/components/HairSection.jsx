import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../App.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import hair1 from "../assets/hair3.avif";
import hair2 from "../assets/hair2.jpg";
import hair3 from "../assets/haircut.jpg";
import hair4 from "../assets/hairwash.jpg"; // Hair Color
import hair5 from "../assets/haircolor.webp"; // Hair Wash

gsap.registerPlugin(ScrollTrigger);

const hairServices = [
    { title: "Hair Styling", price: "Rs. 5,000", desc: "Elegant hairstyles for parties, weddings & events.", img: hair1 },
    { title: "Hair Spa", price: "Rs. 4,000", desc: "Deep conditioning and styling for healthy hair.", img: hair2 },
  { title: "Hair Cut", price: "Rs. 2,000", desc: "Trendy and stylish haircuts for every occasion.", img: hair3 },
  { title: "Hair Wash", price: "Rs. 1,000", desc: "Relaxing and nourishing hair wash treatment.", img: hair4 },
  { title: "Hair Color", price: "Rs. 3,500", desc: "Vibrant and classy hair coloring for a fresh look.", img: hair5 },
];

const HairSection = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 80 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 50%",
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <section className="py-16 bg-[#703d02]">
      {/* Heading */}
      <h2 className="hero-heading text-center text-white md:text-5xl text-3xl font-bold mb-4 px-4 md:px-0">
        Hair Services
      </h2>
      <p className="text-center max-w-3xl mx-auto text-white/85 text-base md:text-lg mb-10 leading-relaxed px-4 md:px-0">
        Explore our professional hair services to keep your hair healthy, stylish, and perfect for every occasion.
      </p>

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
        {hairServices.map((item, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="relative group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition-all duration-500"
          >
            {/* Image */}
            <div className="overflow-hidden h-60 md:h-72 lg:h-80">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 text-center">
              <h3 className="text-2xl md:text-3xl bg-linear-to-r from-[#b86506] via-[#ebab56] to-[#b86506] bg-clip-text text-transparent font-semibold mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2 md:mb-3">{item.desc}</p>
              <p className="text-xl md:text-2xl font-bold bg-linear-to-r from-[#b86506] via-[#ebab56] to-[#b86506] bg-clip-text text-transparent mb-3">
                {item.price}
              </p>
              <button className="px-6 md:px-8 py-2 md:py-3 rounded-full bg-linear-to-r from-[#b86506] via-[#ebab56] to-[#b86506] text-white font-semibold tracking-wide hover:bg-[#ebab56] hover:shadow-xl hover:shadow-yellow-500/50 transition-all duration-300">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HairSection;
