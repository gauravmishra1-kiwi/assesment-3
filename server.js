const express=require('express');
const app=express();
require('./db/connection');
const user=require('./model/user');
const train=require('./model/tain');
const ticut=require('./model/ticut');
const userRouter=require('./router/userRouter');


app.use(express.json());
app.use(userRouter);


const port=3000;
app.listen(port,()=>{
    console.log(`server running at ${port}`);
})