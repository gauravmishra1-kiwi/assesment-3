const Train=require('../model/tain')

const registerTrain=async(req,res)=>{
    try {
        const train=new Train({
            trainName:req.body.trainName,
            trainNo:req.body.trainNo,
            status:req.body.status,
         })
         const train_data=await train.save();
         res.send('train added sucessfully',train_data);
    } catch (error) {
        res.send(error);
    }
}

const updateTrain=async(req,res)=>{
    try {
        const _id =req.params.id;
        const updateUser = await User.findByIdAndUpdate(_id,req.body);
        res.send(updateUser);
    } catch (error) {
        res.send(error)
    }    
}

module.exports={
    registerTrain,updateTrain
}
