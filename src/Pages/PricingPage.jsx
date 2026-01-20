import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const PricingPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const item = state?.selectedItem;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState(1);

  const imageRef = useRef(null);
  const detailsRef = useRef(null);
  const formRef = useRef(null);

  if (!item) return <p className="text-center text-xl mt-20">No package selected.</p>;

  const priceNumber = Number(item.price.replace(/[^0-9]/g, ""));
  const totalPrice = priceNumber * quantity;

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });
    tl.fromTo(imageRef.current, { x: -150, opacity: 0 }, { x: 0, opacity: 1 })
      .fromTo(detailsRef.current, { x: 150, opacity: 0 }, { x: 0, opacity: 1 }, "-=0.5")
      .fromTo(formRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.5");
  }, []);

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!name || !phone || !date) {
      alert("Please fill all required fields before confirming!");
      return;
    }

    // ✅ Pass status along with booking details
    navigate("/booking-card", {
      state: {
        selectedItem: item,
        name,
        date,
        quantity,
        status: "Booking Confirmed Successfully!🎉"
      },
    });
  };

  return (
    <section className="min-h-screen bg-linear-to-b from-[#fef6ed] to-[#fff0e0] py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Page Heading */}
        <h2 className="text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-linear-to-r from-[#b86506] via-[#ebab56] to-[#ffb84d]">
          Booking Details
        </h2>

        {/* Product Card */}
        <div className="flex flex-col md:flex-row items-center gap-10 bg-linear-to-br from-[#fff7f0] via-[#fff0e0] to-[#ffe4cc] rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="md:w-1/3 flex justify-center items-center" ref={imageRef}>
            <img
              src={item.img}
              alt={item.title}
              className="w-full rounded-3xl shadow-xl hover:scale-105 transform transition-transform duration-500"
            />
          </div>

          <div className="md:w-2/3 flex flex-col justify-between" ref={detailsRef}>
            <div>
              <h3 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-linear-to-r from-[#b86506] via-[#ebab56] to-[#ffb84d]">
                {item.title}
              </h3>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                {item.desc}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-6 mb-6">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-12 h-12 rounded-full bg-[#b86506]/20 text-[#b86506] font-bold text-3xl hover:bg-[#b86506]/40 transition flex justify-center items-center shadow"
              >
                −
              </button>
              <span className="text-3xl font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-12 h-12 rounded-full bg-[#b86506]/20 text-[#b86506] font-bold text-3xl hover:bg-[#b86506]/40 transition flex justify-center items-center shadow"
              >
                +
              </button>
            </div>

            {/* Price Box */}
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center mb-6">
              <p className="text-lg text-gray-800">Price per booking:</p>
              <p className="text-2xl font-bold text-[#b86506] mt-2">Rs. {priceNumber}</p>
              <p className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-[#b86506] via-[#ebab56] to-[#ffb84d] mt-4">
                Total: Rs. {totalPrice.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <form
          ref={formRef}
          onSubmit={handleConfirmBooking}
          className="mt-10 grid gap-6 bg-white p-8 rounded-3xl shadow-lg max-w-3xl mx-auto"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ebab56] focus:border-transparent"
            required
          />
          <input
            type="tel"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ebab56] focus:border-transparent"
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ebab56] focus:border-transparent"
            required
          />

          <button
            type="submit"
            disabled={!name || !phone || !date}
            className={`flex-1 py-4 rounded-full text-white font-bold shadow-lg transition-all duration-300
              ${!name || !phone || !date
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-linear-to-r from-[#b86506] via-[#ebab56] to-[#ffb84d] hover:shadow-xl"
              }`}
          >
            Confirm Booking
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex-1 py-4 rounded-full bg-gray-200 text-[#b86506] font-semibold hover:bg-gray-300 transition"
          >
            Back to Home
          </button>
        </form>
      </div>
    </section>
  );
};

export default PricingPage;
