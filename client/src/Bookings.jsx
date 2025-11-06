import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";

const Booking = () => {
  const { state } = useLocation();
  const car = state?.car;
  const [distance, setDistance] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const bookNow = async () => {
    if (distance === "" || date === "") {
      alert("please fill all details");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/bookings", {
        carName: car.name,
        category: car.category,
        pricePerKm: car.pricePerKm,
        distance: Number(distance),
        date,
      });
      if (res.data.ok) {
        setMessage("Booking done!");
      } else {
        setMessage("Booking failed!");
      }
    } catch {
      alert("error booking car");
    }
  };

  if (!car) {
    return (
      <div className="container mt-5">
        <h4>No car selected.</h4>
        <a href="/" className="btn btn-secondary mt-3">Back</a>
      </div>
    );
  }

  return (
    <div className="container mt-4" style={{ width: "300px" }}>
      <h3>Book Car</h3>
      <p><b>{car.name}</b></p>
      <p>Category: {car.category}</p>
      <p>₹{car.pricePerKm} per km</p>

      <label>Distance (km)</label>
      <input
        className="form-control mb-2"
        type="number"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
      />

      <label>Date</label>
      <input
        className="form-control mb-2"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button className="btn btn-primary w-100" onClick={bookNow}>
        Confirm Booking
      </button>

      <p className="mt-2" style={{ color: "green" }}>{message}</p>

      <a href="/" className="btn btn-secondary w-100 mt-3">
        Back
      </a>
    </div>
  );
};

export default Booking;
