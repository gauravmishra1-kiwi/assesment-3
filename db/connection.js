const mongoose=require('mongoose');
// mongoose.set('strictquery',false);

mongoose.connect("mongodb+srv://gaurav12:Gaurav12@cluster0.9r8ngum.mongodb.net/assesment3",{
   useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("db connected sucessfully");
})
.catch(()=>{
    console.log("db is not connected");
})
