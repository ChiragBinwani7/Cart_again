import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Car = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [cars, setCars] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const login = () => {
    if (email === "chirag@gmail.com" && pass === "1234") {
      setLoggedIn(true);
      getCars();
    } else {
      alert("wrong id or password");
    }
  };

  const getCars = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cars");
      setCars(res.data);
    } catch {
      alert("error loading cars");
    }
  };

  const goBook = (car) => {
    navigate("/booking", { state: { car } });
  };

  const filteredCars =
    filter === "all"
      ? cars
      : cars.filter((x) => x.category.toLowerCase() === filter);

  if (!loggedIn) {
    return (
      <div className="container mt-5" style={{ width: "300px" }}>
        <h3>Login</h3>
        <label>Email</label>
        <input
          className="form-control mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="form-control mb-2"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button className="btn btn-primary w-100" onClick={login}>
          Login
        </button>
      </div>
    );
  }

  return (
    
    <div className="container mt-4">
      <Navbar />
      <h3>Available Cars</h3>

      <div className="mb-3">
        <button className="btn btn-outline-primary me-2" onClick={() => setFilter("all")}>
          All
        </button>
        <button className="btn btn-outline-primary me-2" onClick={() => setFilter("suv")}>
          SUV
        </button>
        <button className="btn btn-outline-primary me-2" onClick={() => setFilter("sedan")}>
          Sedan
        </button>
        <button className="btn btn-outline-primary" onClick={() => setFilter("compact")}>
          Compact
        </button>
      </div>

      <div className="row">
        {filteredCars.length === 0 ? (
          <p>No cars found</p>
        ) : (
          filteredCars.map((x) => (
            <div className="col-md-4 mb-4" key={x.name}>
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
