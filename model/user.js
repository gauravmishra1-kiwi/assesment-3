const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

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
  address: {
    type: String,
    required: true,
  },
  role:{
    type: String,
    enum: ['admin', 'subadmin', 'user'],
    default:'user'
   },
  permission: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },
  tokens: [{
    token: String
  }]
});

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, 'dfsgjbgjdfbgjdbgjbjgjbguidhsgui');
  this.tokens = this.tokens.concat({ token: token });
  await this.save();
  return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await userdata.findOne({ email: email })
  if (!user) {
    throw new Error('unable to login')
  }
  const ismatch = await bcrypt.compare(password, user.password)
  if (!ismatch) {
    throw new Error('passsword to login')
  }
  return user
}

const userdata = new mongoose.model("userdetails", userSchema);

module.exports = userdata;