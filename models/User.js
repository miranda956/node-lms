
const mongoose=require('mongoose');
const bcrypt= require('bcrypt');

 var userSchema=mongoose.Schema({
     username:{
         type:String
     },
     email:{
         type:String
     },
     password:{
         type:String,
         bcrypt:true
     },
     type:{
         type:String
     },
 })
 var User=module.exports=mongoose.model('User',userSchema);

 module.exports.getUserById=(id,callback)=>{
     User.findById(id,callback)
 }
 module.exports.getUserByUsername=(username,callback)=>{
     var query={username:username}
     User.findOne(query,callback);
 }

 module.exports.saveStudent=(newUser,newStudent,callback)=>{
     bcrypt.hash(newUser.password,10,(err,hash)=>{
         if(err) throw err
         newUser.password=hash
         async.parallel([newUser.save,newStudent.save],callback)
     });
 }
module.exports.saveInstructor=(newUser,newInstructor,callback)=>{
    bcrypt.hash(newUser.password,10,(err,hash)=>{
        if(err) throw err
        newUser.password=hash
        async.parallel([newUser.save,newInstructor],callback)
        
    })
}
module.exports.comparepassword=(candidatepassword,hash,callback)=>{
    bcrypt.compare(candidatepassword,hash,(err,ismatch)=>{
        if(err) throw err
        callback(null,ismatch)
    })
}