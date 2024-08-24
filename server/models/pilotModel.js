const mongoose = require("mongoose");
const pilotSchema = new mongoose.Schema({
  name: String,
  profileImage: String,
  workExperience: Number,
  location: String,
  coordinates: {
    latitude: Number,
    longitude: Number,
  },
});
const Pilot = mongoose.model("Pilot", pilotSchema);
module.exports = { Pilot };
