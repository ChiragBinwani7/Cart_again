const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: String,
  pricePerKm: Number,
  desc: String,
  category: String,
  photo: String, 
  isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model("Car", carSchema);