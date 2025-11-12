import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Car = () => {
  const [cars, setCars] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const getCars = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cars");
      setCars(res.data);
    } catch {
      alert("error loading cars");
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  const goBook = (car) => {
    navigate("/booking", { state: { car } });
  };

  const filteredCars =
    filter === "all"
      ? cars
      : cars.filter((x) => x.category.toLowerCase() === filter);

  return (
    <div className="container mt-4">
      <Navbar />
      <h3>Available Cars</h3>

      <div className="mb-3">
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => setFilter("suv")}
        >
          SUV
        </button>
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => setFilter("sedan")}
        >
          Sedan
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => setFilter("compact")}
        >
          Compact
        </button>
      </div>

      <div className="row">
        {filteredCars.length === 0 ? (
          <p>No cars found</p>
        ) : (
          filteredCars.map((x) => (
            <div className="col-md-4 mb-4" key={x._id}>
              <div className="card h-100">
                <img
                  src={x.photo}
                  className="card-img-top"
                  alt={x.name}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{x.name}</h5>
                  <p className="card-text">{x.desc}</p>
                  <p>₹{x.pricePerKm} per km</p>
                  <p>Category: {x.category}</p>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => goBook(x)}
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Car;
