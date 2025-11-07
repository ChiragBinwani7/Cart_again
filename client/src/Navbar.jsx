import React from "react";


const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Car Rental</a>
        <div>
          <a href="/" className="btn btn-outline-light btn-sm me-2">
            Cars
          </a>
          <a href="/cart" className="btn btn-outline-light btn-sm">
            My Bookings
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
