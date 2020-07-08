const express =require('express');

const classes=require('../models/class');

var router=express.Router();

router.get('/',(req,res)=>{
    var query=classes.find();
    query.select('title description instructor lessons ');
    query.exec((err,classes)=>{
        if(err) return handleError(err);
        res.render('classes',{'classes':classes})
    })
})
module.exports=router;