import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { gsap } from "gsap";
import Swal from "sweetalert2";
import "../App.css";

const BookingCard = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  const item = state?.selectedItem;
  const name = state?.name;
  const date = state?.date;
  const quantity = state?.quantity;
  const status = state?.status || "Booking Pending";

  if (!item) return <p className="text-center text-xl mt-20">No booking data found.</p>;

  const totalPrice = Number(item.price.replace(/[^0-9]/g, "")) * quantity;

  // GSAP animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });
    tl.fromTo(cardRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0 })
      .fromTo(imageRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1 }, "-=0.5")
      .fromTo(contentRef.current, { x: 100, opacity: 0 }, { x: 0, opacity: 1 }, "-=0.5");
  }, []);

  // Download function
  const downloadBookingCard = () => {
    const node = cardRef.current;
    if (!node) return;

    domtoimage
      .toBlob(node)
      .then((blob) => saveAs(blob, "BookingCard.png"))
      .catch((error) => console.error("Error generating image:", error));
  };

  // Cancel Booking function
  const cancelBooking = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel your booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
      reverseButtons: true,
      background: "#fff7f0",
      confirmButtonColor: "#b86506",
      cancelButtonColor: "#ababab",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Cancelled!",
          text: "Your booking has been cancelled.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          background: "#fff7f0",
        });
        navigate("/");
      }
    });
  };

  return (
    <section className="min-h-screen bg-[#edcba5] py-16 px-4">
      <div className="flex justify-center items-start">
        <div
          ref={cardRef}
          className="w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row bg-linear-to-r from-[#b86506] via-[#ebab56] to-[#ffb84d] p-6 md:p-10"
        >
          {/* Left Image */}
          <div ref={imageRef} className="md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
            <img
              src={item.img}
              alt={item.title}
              className="rounded-2xl shadow-lg w-64 md:w-full object-cover"
            />
          </div>

          {/* Right Content */}
          <div ref={contentRef} className="md:w-1/2 flex flex-col justify-center text-white md:pl-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Booking Card</h2>
            <p className="mb-2"><strong>Package:</strong> {item.title}</p>
            <p className="mb-2"><strong>Name:</strong> {name}</p>
            <p className="mb-2"><strong>Date:</strong> {date}</p>
            <p className="mb-2"><strong>Quantity:</strong> {quantity}</p>
            <p className="mb-2"><strong>Status:</strong> {status}</p>
            <p className="text-xl font-bold mt-2">Total: Rs. {totalPrice.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-4 mt-6">
        <button
          onClick={downloadBookingCard}
          className="py-3 rounded-full w-200 bg-white text-[#b86506] font-bold shadow-lg hover:shadow-xl transition hover:bg-gray-100"
        >
          Download Booking Card
        </button>

        <button
          onClick={() => navigate("/")}
          className="py-3 rounded-full w-200 bg-gray-200 text-[#b86506] font-semibold hover:bg-gray-300 transition"
        >
          Go Back to Home
        </button>

        <button
          onClick={cancelBooking}
          className="py-3 rounded-full w-200 bg-[#b86506] text-white font-bold shadow-lg hover:shadow-xl transition"
        >
          Cancel Booking
        </button>
      </div>
    </section>
  );
};

export default BookingCard;
