const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const carRoutes = require("./routes/carRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/photos", express.static("photos"));

mongoose.connect("mongodb://127.0.0.1:27017/cart_rental_demo")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("DB error:", err));

app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
