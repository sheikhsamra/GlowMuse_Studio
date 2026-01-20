import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../App.css";

import facial from "../assets/facial.jpg";
import bridal from "../assets/bridal.jpg";
import party from "../assets/party.jpg";
import waxing from "../assets/waxing.jpg";
import maniPedi from "../assets/maniPedi.jpg";
import hair from "../assets/hair.jpg";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: "Mani & Pedi", img: maniPedi },
  { title: "Facial", img: facial },
  { title: "Bridal Makeup", img: bridal },
  { title: "Party Makeup", img: party },
  { title: "Hair Styling", img: hair },
  { title: "Waxing", img: waxing },
];

const ServicesCards = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
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
    <section id="services" className="py-16 -m-4 bg-[#703d02]">
      <h2 className="hero-heading text-center md:text-7xl text-4xl font-bold mb-12 text-white">
        Our Beauty Services
      </h2>

      <p className="text-center max-w-2xl mx-auto mt-5 mb-10 text-white/80 text-base md:text-lg leading-relaxed">
        We offer a wide range of professional beauty services designed to enhance
        your natural beauty and boost your confidence. From relaxing spa
        treatments to glamorous makeup looks, our expert team ensures quality,
        comfort, and stunning results for every client.
      </p>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {services.map((service, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="group relative overflow-hidden rounded-3xl
            shadow-lg hover:shadow-[0_15px_40px_rgba(190,66,95,0.45)]
            transition-all duration-500"
          >
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-72 object-cover
              group-hover:scale-110 transition-transform duration-700"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-linear-to-t
              from-[#703d02]/80 to-transparent
              opacity-0 group-hover:opacity-100
              transition duration-500"
            ></div>

            {/* text */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <h3
                className="hero-heading text-white md:text-4xl text-2xl font-semibold
                translate-y-6 opacity-0
                group-hover:translate-y-0 group-hover:opacity-100
                transition-all duration-500"
              >
                {service.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesCards;
