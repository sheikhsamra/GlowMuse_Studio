import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {

  return (
    <footer
      className="bg-[#3d2100] text-white py-16 pb-8 z-10"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div className="flex flex-col items-start gap-4">
          <img src={logo} alt="Logo" className="h-16 w-16" />
          <p className="text-gray-100/90 max-w-sm">
            GlowMuse Studio - Professional Beauty & Salon Services. Making your special moments flawless and glamorous.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h4 className="text-xl font-semibold mb-3">Quick Links</h4>
          <ul className="flex flex-col gap-2 text-gray-100/90">
            {["Home", "Services", "Makeup", "Hair", "Skin & Facial", "Hand & Feet", "Waxing", "Contact"].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`}
                  className="hover:text-[#b86506] transition-colors duration-300"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-2">
          <h4 className="text-xl font-semibold mb-3">Contact Info</h4>
          <p className="text-gray-100/90">📞 +92 316 8596692</p>
          <p className="text-gray-100/90">✉ shaikhsamra855@gmail.com</p>
          <p className="text-gray-100/90">📍 Karachi, Pakistan</p>
          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="https://github.com/sheikhsamra" target="_blank" className="hover:text-[#b86506] transition-colors duration-300">🔗 GitHub</a>
            <a href="https://www.linkedin.com/in/samra-moinuddin/" target="_blank" className="hover:text-[#b86506] transition-colors duration-300">🔗 LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 text-center text-gray-200/70 text-sm">
        &copy; {new Date().getFullYear()} GlowMuse Studio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
