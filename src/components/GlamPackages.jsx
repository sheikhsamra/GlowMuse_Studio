import React, { useEffect, useRef } from "react";
import "../App.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import party from "../assets/party3.jpg";
import bridal from "../assets/bridal3.jpg";
import reception from "../assets/reception2.jpg";
import model from "../assets/bridal4.jpg";
import party1 from "../assets/party4.jpg";
import bridal2 from "../assets/bridal2.avif";

gsap.registerPlugin(ScrollTrigger);

const packages = [
  { title: "Bridal Makeup", price: "Rs. 25,000", desc: "Complete bridal transformation for your Nikah day.", img: bridal },
  { title: "Bridal Makeup", price: "Rs. 20,000", desc: "Complete bridal transformation for your big day.", img: bridal2 },
  { title: "Reception Makeup", price: "Rs. 18,000", desc: "Elegant and flawless look for wedding reception.", img: reception },
  { title: "Model Makeup", price: "Rs. 12,000", desc: "High-end makeup for shoots, fashion & portfolio.", img: model },
  { title: "Model Makeup", price: "Rs. 5,000", desc: "High-end makeup for special occasions.", img: party1 },
  { title: "Party Makeup", price: "Rs. 6,000", desc: "Perfect glam look for parties, birthdays & special nights.", img: party },
];

const GlamPackages = ({ searchTerm }) => {
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);

  // Filter packages based on searchTerm
  const filteredPackages = packages.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // GSAP scroll animation for cards
  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;
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
  }, [filteredPackages]);

  // Scroll to section & highlight matched cards
  useEffect(() => {
    if (!searchTerm) return;
    if (filteredPackages.length > 0 && sectionRef.current) {
      // Scroll section into view
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

      // Highlight matched cards
      filteredPackages.forEach((pkg, index) => {
        const card = cardsRef.current[index];
        if (card) {
          gsap.fromTo(
            card,
            { scale: 1 },
            { scale: 1.05, duration: 0.5, yoyo: true, repeat: 1, ease: "power1.inOut" }
          );
        }
      });
    }
  }, [searchTerm, filteredPackages]);

  return (
    <section ref={sectionRef} className="py-16 bg-linear-to-r from-[#703d02] via-[#ebab56] to-[#703d02]">
      {/* Heading */}
      <h2 className="hero-heading text-center text-white md:text-6xl text-3xl font-bold mb-4 px-4 md:px-0">
        Glamour Packages
      </h2>
      <p className="text-center max-w-3xl mx-auto text-white/85 text-base md:text-lg mb-10 leading-relaxed px-4 md:px-0">
        Choose from our exclusive beauty packages crafted to give you a flawless, luxurious, and camera-ready look for every special moment.
      </p>

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
        {filteredPackages.length > 0 ? (
          filteredPackages.map((item, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
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
                <button className="px-6 md:px-8 py-2 md:py-3 rounded-full bg-linear-to-r from-[#b86506] via-[#ebab56] to-[#b86506] text-white font-semibold tracking-wide hover:shadow-xl hover:shadow-yellow-500/50 transition-all duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white col-span-full text-xl md:text-2xl">
            No packages found.
          </p>
        )}
      </div>
    </section>
  );
};

export default GlamPackages;
