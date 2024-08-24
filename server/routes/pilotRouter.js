const express = require("express");
const router = express.Router();
const {
  getPilots,
  getBestPilots,
  getPilotByRange,
} = require("../controllers/pilotController");
router.get("/", getPilots);
router.post("/best", getBestPilots);
router.post("/inrange", getPilotByRange);
module.exports = router;
