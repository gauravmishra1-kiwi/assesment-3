const express=require('express');
const app=express();
require('./db/connection');
const swaggerUI=require("swagger-ui-express");
const YAML =require("yamljs");
const swaggerJsDocs=YAML.load('./api.yaml')
const userRouter=require('./router/userRouter');
const trainRouter=require('./router/trainRouter');
// const userRouter=require('./router/userRouter');

app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerJsDocs))

app.use(express.json());
app.use(userRouter);
app.use(trainRouter);


const port=3000;
app.listen(port,()=>{
    console.log(`server running at ${port}`);
})