const express=require("express");
const router=new express.Router();
const User= require('../model/tain');
const train_controller=require('../controller/trainController');
const middleware=require('../authentication/auth');
const admin_auth=require('../authentication/admin_auth');

router.post('/addTrain',admin_auth,train_controller.registerTrain)
router.patch('/updateTrain/:trainNo',admin_auth,train_controller.updateTrain)


module.exports=router;