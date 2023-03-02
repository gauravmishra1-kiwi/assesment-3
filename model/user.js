const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email is already present"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address : {
    type:String,
    required:true,
   },
   isadmin: {
    type: String,
    enum: ['Admin','Subadmin','User'],
    default: 'User'
}
});

const userdata=new mongoose.model("userdetails",userSchema); 

module.exports =userdata;