import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import logo from '../assets/logo.png';
import hero from '../assets/hero3.jpg';

// Components
import ServicesCards from '../components/ServicesCards';
import GlamPackages from '../components/GlamPackages';
import HairSection from '../components/HairSection';
import SkinFacialSection from '../components/SkinFacial';
import HandFeetSection from '../components/HandFeet';
import WaxingSection from '../components/Waxing';
import ContactPage from '../components/Contaxt';
import Footer from '../components/Footer';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Refs for each section
  const glamRef = useRef(null);
  const hairRef = useRef(null);
  const skinRef = useRef(null);
  const handRef = useRef(null);
  const waxingRef = useRef(null);

  // List of services with ref + component
  const services = [
    { title: "Makeup / Glam  / Bridal", component: <GlamPackages searchTerm={searchTerm} />, ref: glamRef },
    { title: "Hair / Color", component: <HairSection searchTerm={searchTerm} />, ref: hairRef },
    { title: "Skin / Facial", component: <SkinFacialSection searchTerm={searchTerm} />, ref: skinRef },
    { title: "Hand / Feet", component: <HandFeetSection searchTerm={searchTerm} />, ref: handRef },
    { title: "Waxing", component: <WaxingSection searchTerm={searchTerm} />, ref: waxingRef },
  ];

  // Filter services based on section title
  const filteredServices = services.filter(s =>
    searchTerm === "" || s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Scroll to first matching service when searchTerm changes
  useEffect(() => {
    if (searchTerm && filteredServices.length > 0) {
      const firstRef = filteredServices[0].ref.current;
      if (firstRef) {
        const offset = 120; // Adjust for navbar
        const topPos = firstRef.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: topPos, behavior: 'smooth' });
      }
    }
  }, [searchTerm, filteredServices]);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 shadow-lg backdrop-blur-md bg-[#3d2100]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4">
          <a href="#home" className="flex items-center gap-2">
            <img src={logo} className="h-12 w-12 md:h-18 md:w-18" alt="Logo" />
            <span className="logo text-xl text-white font-semibold">GlowMuse Studio</span>
          </a>

          <div className="flex items-center md:order-2 gap-3">
            <div className="relative hidden md:block">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-4 pr-10 py-2 border border-[#b86506] text-white rounded-3xl bg-transparent text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ebab56]"
                placeholder="Search services..."
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="absolute right-3 top-2.5 text-white">
                  ✕
                </button>
              )}
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          <div className={`w-full md:flex md:w-auto md:order-1 ${menuOpen ? 'block' : 'hidden'}`}>
            <ul className="flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0">
              {['Home', 'Services', 'Makeup', 'Hair', 'Skin', 'Hand & Feet', 'Waxing', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="menu-item block py-2 px-3 text-white hover:text-[#ebab56] transition-colors font-medium"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {!searchTerm && (
        <div
          id="home"
          className="relative w-full min-h-screen flex items-center md:justify-end justify-center"
          style={{
            backgroundImage: `url(${hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 p-8 rounded-6xl text-center max-w-2xl bg-black/40 backdrop-blur-sm md:mr-20 mx-4 mt-20">
            <h1 className="hero-heading md:text-7xl text-4xl bg-linear-to-r from-[#b86506] to-[#ebab56] bg-clip-text text-transparent font-bold">
              Welcome to GlowMuse Studio
            </h1>
            <p className="mt-4 text-2xl text-white font-semibold">Professional Beauty & Salon Services</p>
            <p className="mt-2 text-xl text-[#ebab56] font-bold italic">Up to 20% Discount for New Members</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="w-full pt-4">
      <ServicesCards />

        {filteredServices.length > 0 ? (
          filteredServices.map((s, i) => (
            <div key={i} ref={s.ref} className="mb-8">
              {s.component}
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-xl text-[#ebab56] font-semibold">
            No results found.
          </div>
        )}
      </main>

      {/* Contact & Footer */}
      <div id="contact" className="w-full">
        <ContactPage />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
