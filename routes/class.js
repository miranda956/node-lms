const express=require('express');
const classes=require('../models/class');

var router= express.Router();


router.get('/',(req,res)=>{
    var query= classes.find();
    query.select('title description instructor lessons ')
    query.exec((err,classes)=>{
        if(err) return handleError(err);
        res.render('Classes/index',{"classes":classes});
    })
})

// get class By id 
router.get('/class/id',(req,res)=>{
    classes.findById(id,(err,classes)=>{
        if(err) return handleError(err)
        res.render('classes/details',{'class':classname});
    })
})
router.get('/:id/lessons',isAuthenticated,(req,res,next)=>{
    classes.findById(id,(err,classes)=>{
        if(err) return handleError(err)
        res.render('lesson/details',{'lesson':classes})
    })
    router.get('/:id/lessons/:lesson_id', isAuthenticated, function(req, res, next) {
        classes.getClassById([req.params.id],function(err, classname){
            var lesson;
            if(err){
                throw err;
            } else {
                for(i=0;i<classname.lessons.length;i++){
                    if(classname.lessons[i].lesson_number == req.params.lesson_id){
                        lesson = classname.lessons[i];
                    }
                }
                res.render('classes/lesson', { "class": classname,"lesson": lesson });
            }
        });
    });

})

function isAuthenticated(req,res,next){
    if(req.isAuthenticated());{
        return next();
    }
    res.redirect('/')
    
}


module.exports=router
 