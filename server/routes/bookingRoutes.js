const express = require("express");
const router = express.Router();
const Booking = require("../model/Booking");
const Car = require("../model/Car");

router.get("/", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

router.post("/", async (req, res) => {
  try {
    const {carName, category, pricePerKm, distance, date } = req.body;
    const total = distance * pricePerKm;
    const newBooking = new Booking({carName, category, pricePerKm, distance, date, total });
    await newBooking.save();
    await Car.findOneAndUpdate({ name: carName }, { isAvailable: false });
    res.json({booking: newBooking });
  } catch {
    res.status(500).json({message: "Error creating booking" });
  }
});

router.delete("/:carName", async (req, res) => {
  try {
    const carName = req.params.carName;
    const booking = await Booking.findOneAndDelete({ carName });
    if (!booking) return res.json({ ok: false, message: "Booking not found" });
    await Car.findOneAndUpdate({ name: carName }, { isAvailable: true });
    res.json({ message: "Booking deleted and car available again" });
  } catch {
    res.status(500).json({message: "Error deleting booking" });
  }
});

module.exports = router;
