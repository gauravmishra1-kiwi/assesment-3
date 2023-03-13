const mongoose = require("mongoose");
const validator = require("validator");

const trainSchema = new mongoose.Schema({
 trainName: {
    type: String,
    required: true,
  },
  trainNo: {
    type: Number,
    required: true,
    unique: [true, "this train already present"]
  },
  status: {
    type: String,
    enum: ['Active','Not-Active'],
    default: 'Not-Active'
  },
  arrivalStation: {
    type: String,
  },
  departureStation : {
    type:String,
   },
});

module.exports=new mongoose.model("train",trainSchema); 

