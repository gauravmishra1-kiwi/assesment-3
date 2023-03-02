const express=require('express')
const app=express();
require('./db/connection')

app.use(express.json())

const port=3000;
app.listen(port,()=>{
    console.log(`server running at ${port}`);
})