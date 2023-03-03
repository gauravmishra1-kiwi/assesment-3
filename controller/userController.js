const User=require('../model/user')
const bcrypt=require('bcryptjs')


const register=async(req,res)=>{
    try {

        const spassword=await bcrypt.hash(req.body.password,10);

       const user= new User({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            address:req.body.address,
            password:spassword,
            isadmin:req.body.type,
            token:req.body.token
        })
        const userData= await User.findOne({email:req.body.email});
        if (userData) {
            res.status(200).send({sucess:false,msg:"this email alrady exits"});
                
        } else {
            const user_data=await user.save();
            res.status(200).send({sucess:true,data:user_data});
        }
    } catch (error) {
        res.status(400).send(error.message);
    
    }
};

const login =async(req,res)=>{
    try {
        
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken() 
        res.status(200).send({message:'User login successfully', data:user,/*token,*/ status : 200 })
    } 
catch(err){
    console.log("invalid email", err);
}
};

const profile=async(req,res)=>{
    try {
        const _id =req.params.id;
        const userData = await User.findById(_id);
        if (!userData) {
            return res.status(404).send();
        } else {
            res.send(userData);
        }
    } catch (error) {
        res.send(error)
    }
};

const update=async(req,res)=>{
    try {
        const _id =req.params.id;
        const updateUser = await User.findByIdAndUpdate(_id,req.body);
        res.send(updateUser);
    } catch (error) {
        res.status(404).send(error);
    }
}

module.exports={
    register,login,profile,update
}