import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../App.css";

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
  const formRef = useRef(null);
  const headingRef = useRef(null);
  const infoRef = useRef([]);

  useEffect(() => {
    // Heading animation
    gsap.from(headingRef.current, {
      y: -50,
      duration: 1,
      ease: "power3.out",
    });

    // Form animation
    gsap.from(formRef.current, {
      y: 50,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });

    // Contact info cards animation
    infoRef.current.forEach((card, index) => {
      gsap.from(card, {
        y: 50,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
        },
      });
    });
  }, []);

  return (
    <section
      className="flex flex-col items-center justify-center py-20 bg-[#703d02]">


      {/* Heading */}
      <h2
        ref={headingRef}
        className="hero-heading relative text-4xl md:text-6xl font-bold text-white text-center mb-8"
      >
        Contact Us
      </h2>

      <div className="relative max-w-7xl w-full px-4 md:px-0 flex flex-col md:flex-row gap-10">
        {/* Contact Form */}
        <form
          ref={formRef}
          className="flex-1 bg-white rounded-3xl p-8 shadow-lg backdrop-blur-sm"
        >
          <h3 className="text-2xl font-semibold mb-6 text-[#b86506]">
            Send a Message
          </h3>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b86506] transition"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b86506] transition"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b86506] transition resize-none"
          />
          <button
            type="submit"
            className="w-full bg-linear-to-r from-[#b86506] via-[#ebab56] to-[#b86506] text-white font-semibold py-3 rounded-full hover:scale-105 hover:shadow-lg transition-transform duration-300"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex-1 flex flex-col gap-6">
          {[
            { title: "Phone", value: "+92 300 1234567" },
            { title: "Email", value: "info@glowmuse.com" },
            { title: "Address", value: "Hyderabad, Pakistan" },
          ].map((item, index) => (
            <div
              key={index}
              ref={(el) => (infoRef.current[index] = el)}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-500"
            >
              <h4 className="text-xl font-semibold text-[#b86506] mb-2">
                {item.title}
              </h4>
              <p className="text-gray-700">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
