const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/Online",{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(!err){
        console.log("connection successfully established");
    }
    else if(err){
        console.log(JSON.stringify(err));
    }
});
require('./class');
require('./instructor');
require('./student');
require('./User');