const express=require("express");
const router=new express.Router();
const User= require('../model/tain');
const train_controller=require('../controller/trainController');
const middleware=require('../authentication/auth')

router.post('/add_Train',middleware,train_controller.registerTrain)
router.post('/update_Train',middleware,train_controller.updateTrain)


module.exports=router;