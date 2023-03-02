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
    enum: ['admin','subadmin','user'],
    default: 'user'
}
});

userSchema.methods.generateAuthToken=async function(){
    try {
    const user=this
    const token=jwt.sign({_id:user._id.toString() }, "HHHHxzcdsdhfvgdyhsfg")
        this.tokens=this.tokens.concat({token:token});
        await this.save(); 
        console.log(token);
        return token;
    } catch (e) {
        res.send("token genrate error")
    }
}

userSchema.statics.findByCredentials=async(email,password)=>{
    const user=await userdata.findOne({email:email})
  

    if(!user){
        throw new Error('unable to login')
    }
    
    const ismatch=await bcrypt.compare(password, user.password)
    console.log(password);
    console.log(user.password);

    if(!ismatch){
        throw new Error('passsword to login')
    }

    return user
}

const userdata=new mongoose.model("userdetails",userSchema); 

module.exports =userdata;