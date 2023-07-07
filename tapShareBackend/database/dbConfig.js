const mongoose = require("mongoose");
const { MONGO_URI } = require("../config/secrets");

const mongoConnection = () => {
  try {
    mongoose.connect(MONGO_URI);
    console.log("waiting DB to connect");
  } catch (err) {
    console.log(err);
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!!");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected Successfully!!");
});

module.exports = mongoConnection;
