const express = require("express");
const router = express.Router();
const Booking = require("../model/Booking");
const Car = require("../model/Car");

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    console.log("Fetch error:", err);
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { carName, category, pricePerKm, distance, date } = req.body;
    const total = distance * pricePerKm;
    const selectedDate = new Date(date);
    const car = await Car.findOne({ name: carName });
    if (!car) return res.status(404).json({ message: "Car not found" });
    const isBooked = car.bookedDates.some(
      d => new Date(d).toDateString() === selectedDate.toDateString()
    );
    if (isBooked) {
      return res.json({ message: "Car already booked for this date" });
    }
    const newBooking = new Booking({
      carName,
      category,
      pricePerKm,
      distance,
      date: selectedDate,
      total,
    });
    await newBooking.save();
    car.bookedDates.push(selectedDate);
    await car.save();
    res.json({ message: "Booking done", booking: newBooking });
  } catch (err) {
    console.log("Booking error:", err);
    res.status(500).json({ message: "Error creating booking" });
  }
});

router.delete("/:carName", async (req, res) => {
  try {
    const carName = req.params.carName;
    const booking = await Booking.findOneAndDelete({ carName });
    if (!booking) return res.json({ message: "Booking not found" });
    const car = await Car.findOne({ name: carName });
    if (car) {
      car.bookedDates = car.bookedDates.filter(
        d => new Date(d).toDateString() !== new Date(booking.date).toDateString()
      );
      await car.save();
    }
    res.json({ message: "Booking deleted and date freed" });
  } catch (err) {
    console.log("Delete error:", err);
    res.status(500).json({ message: "Error deleting booking" });
  }
});

module.exports = router;
