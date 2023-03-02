const mongoose = require("mongoose");
const validator = require("validator");

const trainSchema = new mongoose.Schema({
 train_name: {
    type: String,
    required: true,
    unique: [true, "this name is already present"]
  },
  train_no: {
    type: Number,
    required: true,
    unique: [true, "this train already present"]
  },
  status: {
    type: Number,
    required: true,
    enum: ['Active','Not-Active'],
    default: 'Not-Active'

  },
  Arrival_time: {
    type: String,
    required: true,
  },
  departure_time : {
    type:String,
    required:true,
   },
});

module.exports=new mongoose.model("train",trainSchema); 

