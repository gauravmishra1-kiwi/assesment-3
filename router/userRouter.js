const express=require("express");
const router=new express.Router();
const User= require('../model/user');
const user_controller=require('../controller/userController');
const middleware=require('../authentication/auth');


router.post('/register',user_controller.register)
router.post('/login',user_controller.login)
router.get('/profile/:id',user_controller.profile)
router.patch('/update/:id',user_controller.update)
router.patch('/permission/:id',middleware,user_controller.permission)



module.exports=router;