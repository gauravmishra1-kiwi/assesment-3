const Train=require('../model/tain');
const nodemailer=require('../email/nodemailer');
const User=require('../model/user')



const registerTrain=async(req,res)=>{
    try {

        if(await Train.findOne({trainNo : req.body.trainNo})){
            throw new Error('Train already exists')
        }
        const train=new Train({
            trainName:req.body.trainName,
            trainNo:req.body.trainNo,
            status:req.body.status,
            journeyStart:req.body.journeyStart,
            journeyEnd:req.body.journeyEnd,
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
        const trainNo =req.params.trainNo;
        
        const train = await Train.findOne({trainNo});
        
        train.ArrivedStation = req.body.ArrivedStation;
        await train.save()

        for(let i=0;i<train.subscribeUser.length;i++){
            const user = await User.findById(train.subscribeUser[i])
            nodemailer.updatesubscriber(user.email , train , user)
        }
        res.send(train);
    } catch (error) {
        res.send(error)
    }    
}

module.exports={
    registerTrain,updateTrain
}
