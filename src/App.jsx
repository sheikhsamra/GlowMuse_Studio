import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import PricingPage from "./Pages/PricingPage.jsx";
import BookingCard from "./Pages/BookingCard.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pricing-page" element={<PricingPage />} />
      <Route path="/booking-card" element={<BookingCard />} />
    </Routes>
  );
}

export default App;
