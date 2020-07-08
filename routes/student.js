const express =require('express');
const router=express.Router();

Class=require('../models/class');
Student=require('../models/student');
User=require('../models/User');

router.get('/classes',isAuthenticated,(req,res,next)=>{
    Student.getStudentByUsername(req.user.username,(err,student)=>{
        if(err) throw err
        res.render('students/classes',{'student':student})
    })

})

router.post('/classes/regester',(re,res)=>{
    info=[];
    info['student_username']=req.user.username;
    info['class_id']=req.body.class_id;
    info['class_title']=req.body.class_title

    Student.regester(info,(err,student)=>{
        if(err) throw err
    })
    res.redirect('/students/classes');
})

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
}

module.exports=router;