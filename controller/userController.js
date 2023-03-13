const User=require('../model/user');
const bcrypt=require('bcryptjs');
const middleware=require('../authentication/auth');


const register=async(req,res)=>{
    try {
        const spassword=await bcrypt.hash(req.body.password,10);
       const user= new User({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            address:req.body.address,
            password:spassword,
            role:req.body.role,
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
        res.send(error)
    }    
}

const permission=async(req,res)=>{
    try {
        const id =req.params.id;
        const subadmin=await User.findById(id);
        if(subadmin.role!='subadmin'){
            return res.send('make subadmin first');
        }
        if(subadmin.permission=='inactive'){
            subadmin.permission='active';
            
            await subadmin.save();
            
            res.send({message:"subadmin active"});
        }
        else{
            subadmin.permission = 'inactive';
            await subadmin.save();
            res.send({message:"subadmin inactive"})
        }
    } catch (error) {
        res.send(error)
    }
}

const subscription=async(req,res)=>{
    try {
        const id =req.params.id;
        const user=await User.findById(id);
        if(user.role!='user'){
            return res.send('it is not a user');
        }
        if(user.scbscribeUser=='inactive'){
            user.scbscribeUser='active';
            await user.save();
            res.send({message:"user subscribed"});
        }
        else{
            user.scbscribeUser = 'inactive';
            await user.save();
            res.send({message:"user unsubscribed"})
        }
    } catch (error) {
        res.send(error)
    }
}

module.exports={

    register,login,profile,update,permission,subscription

}