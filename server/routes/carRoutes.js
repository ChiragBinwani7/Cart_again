const express = require("express");
const router = express.Router();
const Car = require("../model/Car");

router.get("/", async (req, res) => {
  const cars = await Car.find({ isAvailable: true });
  res.json(cars);
});

router.post("/", async (req, res) => {
  try {
    const { name, pricePerKm, desc, category, photo } = req.body;
    const newCar = new Car({ name, pricePerKm, desc, category, photo });
    await newCar.save();
    res.json({ message: "Car added successfully", car: newCar });
  } catch {
    res.status(500).json({ message: "Error adding car" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Car deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting car" });
  }
});

module.exports = router;
