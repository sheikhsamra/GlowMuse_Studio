import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import logo from './assets/logo.png';
import hero from './assets/hero3.jpg';
import { gsap } from 'gsap';
import ServicesCards from './components/ServicesCards';
import GlamPackages from './components/GlamPackages';
import HairSection from './components/HairSection';
import SkinFacialSection from './components/SkinFacial';
import HandFeetSection from './components/HandFeet';
import WaxingSection from './components/Waxing';
import ContactPage from './components/Contaxt';
import Footer from './components/Footer';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const lastScroll = useRef(window.scrollY);

  useEffect(() => {
    if (!navRef.current) return;
    const navHeight = navRef.current.offsetHeight;

    // Page load animation
    gsap.fromTo(
      navRef.current,
      { y: -navHeight, opacity: 1 },
      { y: 0, duration: 1, ease: 'power3.out' }
    );

    // Scroll hide/show
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll.current && currentScroll > 100) {
        gsap.to(navRef.current, { y: -navHeight, duration: 0.5, ease: 'power2.out' });
      } else if (currentScroll < lastScroll.current) {
        gsap.to(navRef.current, { y: 0, duration: 0.5, ease: 'power2.out' });
      }
      lastScroll.current = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 shadow-lg backdrop-blur-md bg-[#3d2100]"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <img src={logo} className="h-18 w-18 drop-shadow-md" alt="Logo" />
            <span className="logo text-xl text-white font-semibold tracking-wide">
              GlowMuse Studio
            </span>
          </a>

          {/* Right side */}
          <div className="flex items-center md:order-2 gap-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-9 pr-4 py-2 border border-[#b86506] rounded-3xl text-sm placeholder:text-white focus:outline-none focus:ring-2 focus:ring-[#b86506] shadow-md transition"
                placeholder="Search"
              />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white w-10 h-10 rounded-full hover:bg-[#b86506] transition flex items-center justify-center"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M5 7h14M5 12h14M5 17h14"
                />
              </svg>
            </button>
          </div>

          {/* Menu */}
          <div
            ref={menuRef}
            className={`w-full md:flex md:w-auto md:order-1 ${menuOpen ? 'block' : 'hidden'}`}
          >
            <ul className="flex flex-col md:flex-row md:space-x-2 mt-4 md:mt-0  md:bg-transparent p-5 md:p-0 rounded-2xl shadow-md md:shadow-none transition-all">
              {[
                { name: 'Home', href: '#home' },
                { name: 'Services', href: '#services' },
                { name: 'Makeup', href: '#makeup' },
                { name: 'Hair', href: '#hair' },
                { name: 'Skin & Facial', href: '#skin' },
                { name: 'Hand & Feet', href: '#hand' },
                { name: 'Waxing', href: '#waxing' },
                { name: 'Contact', href: '#contact' },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="menu-item block py-1 px-3 text-white md:hover:text-[#b86506] font-medium transition-all duration-300 hover:text-[#ffffff] md:hover:bg-transparent"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero page content */}
      <div
        id="home"
        className="pt-28 min-h-200 bg-[#fff0f5] flex items-center md:justify-end justify-center relative"
        style={{ backgroundImage: `url(${hero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="p-8 rounded-6xl text-center max-w-2xl bg-white/20 md:bg-transparent shadow-lg md:shadow-none">
          <h1 className="hero-heading md:text-7xl text-4xl bg-linear-to-r from-[#b86506] via-[#ebab56] to-[#b86506] bg-clip-text text-transparent font-bold">
            Welcome to GlowMuse Studio
          </h1>
          <p className="hero-heading mt-4 text-2xl text-white font-semibold">
            Professional Beauty & Salon Services
          </p>
          <p className="mt-4 text-2xl bg-linear-to-r from-[#b86506] via-[#ebab56] to-[#b86506] bg-clip-text text-transparent font-bold">Upto 20% Discount for new Members</p>
        </div>
      </div>

      {/* Services section */}
      <div id="services">
        <ServicesCards />
      </div>

      {/* Glam Packages section */}
      <div id="makeup">
        <GlamPackages />
      </div>

      {/* Hair Services section */}
      <div id="hair">
        <HairSection />
      </div>

      {/* Skin section placeholder */}
      <div id="skin">
        <SkinFacialSection />
      </div>

      {/* Hand & Feet section placeholder */}
      <div id="hand" >
        <HandFeetSection />
      </div>

      {/* Waxing section placeholder */}
      <div id="waxing">
        <WaxingSection />
      </div>

      {/* Contact section placeholder */}
      <div id="contact">
        <ContactPage/>
      </div>
      {/* Footer  */}
        <Footer />
    </>
  );
};

export default App;
