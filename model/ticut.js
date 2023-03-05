const mongoose = require("mongoose");
const validator = require("validator");

const ticutSchema = new mongoose.Schema({
  train_name: {
    type: String,
    required: true,
    unique: [true, "this name is already present"],
  },
  train_no: {
    type: Number,
    required: true,
    unique: [true, "this train already present"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "notdefined"],
    default: "notdefined",
  },
  bordingStation: {
    type: String,
    required: true,
  },
  destinationStation: {
    type: String,
    required: true,
  },
  currentStation: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("Ticut", ticutSchema);
