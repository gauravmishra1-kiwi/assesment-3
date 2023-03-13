const User=require('../model/user');
const Train=require('../model/tain');
const bcrypt=require('bcryptjs');
const middleware=require('../authentication/auth');
const nodemailer=require('../email/nodemailer')


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
        res.send(req.user);
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
        const train_id = req.params.id
        
        const train = await Train.findById(train_id)
        
        train.subscribeUser.push(req.user._id);
        req.user.subscribeTrain = train_id
        await train.save()
        await req.user.save()
        nodemailer.subscribeEmail(req.user.email , train , req.user)
        return res.status(200).json("train successfully subscribed");
    } catch (error) {
        res.send(error)
    }
}

module.exports={

    register,login,profile,update,permission,subscription

}