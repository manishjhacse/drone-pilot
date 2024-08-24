const mongoose = require("mongoose");
require("dotenv").config();
exports.connectDB = () => {
  mongoose
    .connect(process.env.mongoDBUrl)
    .then(() => {
      console.log("Database connected Successfully");
    })
    .catch((err) => {
      console.log("Something went wrong while connecting to Database");
      console.log(err);
      process.exit(1);
    });
};
