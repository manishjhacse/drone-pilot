const {Pilot} = require("../models/pilotModel");
const haversine = require("haversine");

//get all pilots
exports.getPilots = async (req, res) => {
  try {
    const pilots = await Pilot.find();
    res.json(pilots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get 10 best pilot in the range
exports.getBestPilots = async (req, res) => {
  try {
    const { latitude, longitude, range } = req.body;
    const pilots =await Pilot.find();
    const filteredPilot = pilots
      .filter((pilot) => {
        const distance = haversine({latitude,longitude}, pilot?.coordinates, { unit: 'km' });
        return distance <= range;
      })
      .sort((a, b) => b.workExperience - a.workExperience)
      .slice(0, 10);
    res.json(filteredPilot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get all pilot in a range

exports.getPilotByRange = async (req, res) => {
    try {
        const { latitude, longitude, range } = req.body;
        const pilots =await Pilot.find();
        const filteredPilot = pilots
          .filter((pilot) => {
            const distance = haversine({latitude,longitude}, pilot?.coordinates, { unit: 'km' });
            return distance <= range;
          })
        res.json(filteredPilot);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};
