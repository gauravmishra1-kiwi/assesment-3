const express=require('express');
const app=express();
require('./db/connection');
const user=require('./model/user');
const train=require('./model/tain');
const station=require('./model/station');

app.use(express.json())

const port=3000;
app.listen(port,()=>{
    console.log(`server running at ${port}`);
})