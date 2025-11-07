import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Car from './Car';
import Booking from "./Bookings";
import Cart from "./Cart";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Car />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;
