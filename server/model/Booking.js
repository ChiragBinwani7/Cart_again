const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
       
  carName: String,       
  category: String,      
  pricePerKm: Number,    
  distance: Number,     
  date: Date,           
  total: Number          
});

module.exports = mongoose.model("Booking", bookingSchema);
