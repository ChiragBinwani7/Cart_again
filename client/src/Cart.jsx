import React, { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch {
      alert("error loading bookings");
    }
  };

  const deleteBooking = async (name) => {
    try {
      await axios.delete("http://localhost:5000/api/bookings/" + name);
      getBookings();
    } catch {
      alert("error deleting booking");
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div className="container mt-4">
      <h3>My Bookings</h3>
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>Car</th>
            <th>Category</th>
            <th>Price per Km</th>
            <th>Distance</th>
            <th>Total</th>
            <th>Date</th>
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="7">No bookings yet</td>
            </tr>
          ) : (
            bookings.map((x) => (
              <tr key={x._id}>
                <td>{x.carName}</td>
                <td>{x.category}</td>
                <td>{x.pricePerKm}</td>
                <td>{x.distance}</td>
                <td>{x.total}</td>
                <td>{x.date ? x.date.substring(0, 10) : ""}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteBooking(x.carName)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <a href="/" className="btn btn-secondary mt-3">
        Back
      </a>
    </div>
  );
};

export default Cart;
