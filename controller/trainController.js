const Train=require('../model/tain')

const registerTrain=async(req,res)=>{
    try {

        if(await Train.findOne({trainNo : req.body.trainNo})){
            throw new Error('Train already exists')
        }
        const train=new Train({
            trainName:req.body.trainName,
            trainNo:req.body.trainNo,
            status:req.body.status,
         })
         const train_data=await train.save();
         res.send({
            message: 'Train added successfully',
            data : train_data
         });
    } catch (error) {
        res.send(error.message);
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
