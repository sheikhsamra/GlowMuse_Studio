import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import waxing1 from "../assets/waxing1.jpg";
import waxing2 from "../assets/waxing2.webp";
import waxing3 from "../assets/waxing3.jpg";

gsap.registerPlugin(ScrollTrigger);

const waxingServices = [
  { title: "Full Body Waxing", price: "Rs. 3,500", desc: "Complete hair removal for smooth and silky skin.", img: waxing1 },
  { title: "Leg Waxing", price: "Rs. 1,500", desc: "Gentle and effective leg hair removal for a flawless look.", img: waxing2 },
  { title: "Underarm Waxing", price: "Rs. 1,000", desc: "Clean and smooth underarms with long-lasting results.", img: waxing3 },
];

const WaxingSection = ({ searchTerm = "" }) => {
  const navigate = useNavigate();
  const cardsRef = useRef([]);

  // Filter based on searchTerm
  const filteredWaxing = waxingServices.filter(item =>
    searchTerm.trim() === "" || item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Scroll to first matched card
  useEffect(() => {
    if (searchTerm && filteredWaxing.length > 0) {
      const firstIndex = waxingServices.findIndex(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (firstIndex !== -1 && cardsRef.current[firstIndex]) {
        const topPos = cardsRef.current[firstIndex].getBoundingClientRect().top + window.pageYOffset - 120;
        window.scrollTo({ top: topPos, behavior: "smooth" });
      }
    }
  }, [searchTerm, filteredWaxing]);

  // GSAP Animation
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, filteredWaxing.length);
    cardsRef.current.forEach(card => {
      if (!card) return;
      gsap.fromTo(
        card,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 70%",
            scrub: true,
          },
        }
      );
    });
  }, [filteredWaxing]);

  // Hide section if no matches
  if (searchTerm !== "" && filteredWaxing.length === 0) {
    return null;
  }

  return (
    <section id="waxing" className="py-16 bg-linear-to-r from-[#6a2c1f] via-[#eba95b] to-[#6a2c1f]">
      <h2 className="hero-heading text-center text-white md:text-5xl text-3xl font-bold mb-4 px-4 md:px-0">
        Waxing Services
      </h2>
      <p className="text-center max-w-3xl mx-auto text-white/85 text-base md:text-lg mb-10 leading-relaxed px-4 md:px-0">
        Smooth, clean, and professional waxing services for all areas, giving your skin a flawless finish.
      </p>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
        {filteredWaxing.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            ref={el => cardsRef.current[index] = el}
            className="relative group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition-all duration-500"
          >
            <div className="overflow-hidden h-60 md:h-72 lg:h-80">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-4 md:p-6 text-center">
              <h3 className="text-2xl md:text-3xl bg-linear-to-r from-[#b86506] via-[#ebab56] to-[#b86506] bg-clip-text text-transparent font-semibold mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2 md:mb-3">{item.desc}</p>
              <p className="text-xl md:text-2xl font-bold bg-linear-to-r from-[#b86506] via-[#ebab56] to-[#b86506] bg-clip-text text-transparent mb-3">
                {item.price}
              </p>
              <button
                onClick={() => navigate("/pricing-page", { state: { selectedItem: item } })}
                className="px-6 md:px-8 py-2 md:py-3 rounded-full bg-linear-to-r from-[#b86506] via-[#ebab56] to-[#b86506] text-white font-semibold tracking-wide hover:shadow-xl hover:shadow-yellow-500/50 transition-all duration-300"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WaxingSection;
