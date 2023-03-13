const express=require("express");
const router=new express.Router();
const User= require('../model/user');
const user_controller=require('../controller/userController');
const middleware=require('../authentication/auth');
const admin_auth=require('../authentication/admin_auth');

router.post('/register',user_controller.register)
router.post('/login',user_controller.login)
router.get('/profile/:id',user_controller.profile)
router.patch('/update/:id',user_controller.update)
router.get('/permission/:id',admin_auth,user_controller.permission)
router.get('/subscription/:id',middleware,user_controller.subscription)



module.exports=router;