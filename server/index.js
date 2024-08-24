const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json())
const pilotRoutes=require("./routes/pilotRouter")
require("./config/connectDB").connectDB();
app.use("/api/pilots",pilotRoutes)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is live on PORT ${PORT}`);
});
