const express=require("express");
const router=new express.Router();
const User= require('../model/user');
const user_controller=require('../controller/userController');


router.post('/register',user_controller.register)
router.post('/login',user_controller.login)
router.get('/profile/:id',user_controller.profile)
router.patch('/update/:id',user_controller.update)



module.exports=router;