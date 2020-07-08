const express=require('express');
const router=express.Router();

Class=require('../models/class');
Instructor=require('../models/instructor');
User=require('../models/User');

router.get('/classes',isAuthenticated,(req,res)=>{
    Instructor.getInstructorByUsername(req.user.username,(err,Instructor)=>{
        if(err){
            throw err
        } else {
            res.render('instructor/classes',{'instructor':Instructor})
        }
    });
});

router.post('/classes/regester',(req,res)=>{
    info=[];
    info['instructor_username']=req.user.username;
    info['class_id']=req.body.class_id;
    info['class_title']=req.body.class_title;

    Instructor.regester(info,(err,instructor)=>{
        if(err) return handleError(err);
    })
    res.redirect('/instructor/classes');
})

router.get('/classes/:id/lessons/new',isAuthenticated,(req,res)=>{
    res.render('instructors/newlesson',{'class_id':req.params.id})
});

router.post('/classes/:id/lessons/new',isAuthenticated,(req,res,next)=>{
var info=[];
info['class_id']=req.params.id;
info['lesson_number']=req.body.lesson_number;
info['lesson_title']=req.body.lesson_title;
info['lesson_body']=req.body.lesson_body;

Class.addLesson(info,(err,lesson)=>{
    console.log('lesson  added ');
})
res.redirect('/instructors/classes');
}
)

function isAuthenticated(req,res,next){
    if(req.isAuthenticated());{
        return next();
    }
    res.redirect('/');
   
}

module.exports=router;
