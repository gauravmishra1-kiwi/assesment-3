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
  journeyStart : {
    type:String,
    required: true
   },
  journeyEnd: {
    type: String,
    required: true
  },
  ArrivedStation:{
    type: String,
  },
  subscribeUser: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
  }]
});

module.exports= mongoose.model("train",trainSchema); 

