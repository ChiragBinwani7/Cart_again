const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: String,
  pricePerKm: Number,
  desc: String,
  category: String,
  photo: String,
  bookedDates: [Date] 
});

module.exports = mongoose.model("Car", carSchema);
