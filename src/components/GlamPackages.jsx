import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bridal from "../assets/bridal3.jpg";
import bridal2 from "../assets/bridal2.avif";
import reception from "../assets/reception2.jpg";
import model from "../assets/bridal4.jpg";
import party1 from "../assets/party4.jpg";
import party from "../assets/party3.jpg";

gsap.registerPlugin(ScrollTrigger);

const packages = [
  { title: "Bridal Makeup", price: "Rs. 25,000", desc: "Complete bridal transformation for your Nikah day.", img: bridal },
  { title: "Bridal Makeup", price: "Rs. 20,000", desc: "Complete bridal transformation for your big day.", img: bridal2 },
  { title: "Reception Makeup", price: "Rs. 18,000", desc: "Elegant and flawless look for wedding reception.", img: reception },
  { title: "Model Makeup", price: "Rs. 12,000", desc: "High-end makeup for shoots, fashion & portfolio.", img: model },
  { title: "Model Makeup", price: "Rs. 5,000", desc: "High-end makeup for special occasions.", img: party1 },
  { title: "Party Makeup", price: "Rs. 6,000", desc: "Perfect glam look for parties, birthdays & special nights.", img: party },
];

const GlamPackages = ({ searchTerm = "" }) => {
  const navigate = useNavigate();
  const cardsRef = useRef([]);

  // Filter packages based on searchTerm for rendering only
  const filteredPackages = packages.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Scroll to first matching card on search
  useEffect(() => {
    if (searchTerm && filteredPackages.length > 0) {
      const firstIndex = packages.findIndex(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (firstIndex !== -1 && cardsRef.current[firstIndex]) {
        const topPos = cardsRef.current[firstIndex].getBoundingClientRect().top + window.pageYOffset - 120;
        window.scrollTo({ top: topPos, behavior: "smooth" });
      }
    }
  }, [searchTerm, filteredPackages]);

// GSAP scroll animation
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, filteredPackages.length);

    cardsRef.current.forEach((card) => {
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
  }, [filteredPackages]);

  // Hide section if no matches
  if (searchTerm !== "" && filteredPackages.length === 0) {
    return null;
  }

  return (
    <section id="makeup" className="py-16 bg-linear-to-r from-[#703d02] via-[#ebab56] to-[#703d02]">
      <h1 className="hero-heading text-center text-white md:text-5xl text-3xl font-bold mb-10">
        Glam Packages
      </h1>
      <p className="text-center text-white text-lg mb-10">
        Choose from our premium makeup packages tailored for every occasion.
      </p>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
        {filteredPackages.map((item, i) => (
          <div
            key={`${item.title}-${i}`}
            ref={el => cardsRef.current[i] = el}
            className="relative group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition-all duration-500"
          >
            <div className="overflow-hidden h-65 sm:h-60 md:h-75 lg:h-80">
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

export default GlamPackages;
