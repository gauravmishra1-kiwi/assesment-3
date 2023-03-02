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
}

module.exports={
    register
}