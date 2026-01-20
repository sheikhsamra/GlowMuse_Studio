import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import nails from "../assets/nails.webp";
import manicure from "../assets/manicure.jpg";
import pedicure from "../assets/pedicure.jpg";

gsap.registerPlugin(ScrollTrigger);

const handFeetServices = [
  { title: "Nail Art", price: "Rs. 1,500", desc: "Creative and trendy nail designs for any occasion.", img: nails },
  { title: "Manicure", price: "Rs. 1,000", desc: "Professional manicure to keep your hands soft and nails flawless.", img: manicure },
  { title: "Pedicure", price: "Rs. 1,200", desc: "Relaxing pedicure for smooth and beautiful feet.", img: pedicure },
];

// searchTerm ko default value "" di hai taake undefined error na aaye
const HandFeetSection = ({ searchTerm = "", setSearchMessage }) => {
  const navigate = useNavigate();
  const cardsRef = useRef([]);

  // Safe Filtering logic: Optional chaining aur empty check ke sath
  const filteredHandFeet = handFeetServices.filter(item => {
    const search = (searchTerm || "").toLowerCase();
    return item.title?.toLowerCase().includes(search);
  });

  // Update search input placeholder/message
  useEffect(() => {
    if (setSearchMessage) {
      if (searchTerm !== "" && filteredHandFeet.length === 0) {
        setSearchMessage("Products not found");
      } else {
        setSearchMessage(""); 
      }
    }
  }, [filteredHandFeet.length, searchTerm, setSearchMessage]);

  // GSAP scroll animation
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, filteredHandFeet.length);

    cardsRef.current.forEach(card => {
      if (!card) return;
      gsap.fromTo(card, { y: 80, opacity: 0 }, {
        y: 0,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          end: "top 70%",
          scrub: true,
        }
      });
    });
  }, [filteredHandFeet]);

  const handleBookNow = (item) => {
    navigate("/pricing-page", { state: { selectedItem: item } });
  };

// Render nothing if no matches found
  if (searchTerm !== "" && filteredHandFeet.length === 0) {
    return null;
  }

  return (
    <section id="hand%20&%20feet" className="py-16 -m-8 bg-[#703d02]">
      <h2 className="hero-heading text-center text-white md:text-5xl text-3xl font-bold mb-4 px-4 md:px-0">
        Hand & Feet Services
      </h2>
      <p className="text-center max-w-3xl mx-auto text-white/85 text-base md:text-lg mb-10 leading-relaxed px-4 md:px-0">
        Treat your hands and feet with our professional services for perfect nails and smooth skin.
      </p>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
        {filteredHandFeet.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            ref={(el) => (cardsRef.current[index] = el)}
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
                onClick={() => handleBookNow(item)}
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

export default HandFeetSection;