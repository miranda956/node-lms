const express=require('express');
const user=require('../models/User');
const instructor=require('../models/instructor');
const student=require('../models/student');
const passport=require('passport');
var localStrategy=require('passport-local').Strategy;
var router=express.Router();

router.get('/signup',(req,res)=>{
    res.render('user/signup');
});

router.post('/signup',(req,res,next)=>{
    var f_name=req.body.f_name;
    var l_name=req.body.l_name;
    var street_address=req.body.street_address;
    var city=req.body.city;
    var state=req.body.state;
    var zip=req.body.zip;
    var email=req.body.email;
    var username=req.body.username;
    var password=req.body.password;
    var type=req.body.type;
    var errors= req.validationErrors();
    if(errors){
        res.render('/users/signup',{
            errors:errors,
            f_name:f_name,
            l_name:l_name,
            street_address:street_address,
            city:city,
            state:state,
            zip:zip,
            email:email,
            username:username,
            password:password,
            
        });
    }  else {
      var   newUser=new user({
            email:email,
            username:username,
            password:password,
            type:type
        });
        var newStudent= new student({
            f_name:f_name,
            l_name:l_name,
            address:[{
                street_address:street_address,
                city:city,
                state:state,
                zip:zip
            }],
            email:email,
            username:username
        });
        var newInstructor= new instructor({
            f_name:f_name,
            l_name:l_name,
            address:[{
                street_address:street_address,
                city:city,
                state:state,
                zip:zip

            }],
            email:email,
            username:username

        });
        if(type==='student'){
            user.saveStudent(newUser,newStudent,(err,user)=>{
                console.log('student created');
            })
        } else{
            user.saveInstructor(newUser,newInstructor,(err,user)=>{
                console.log('instructor created')
            })
        }
        res.redirect('/')
    }
});
passport.serializeUser((user,done)=>{
    done(null,user._id);
});
passport.deserializeUser((id,done)=>{
    user.getUserById(id,(err,user)=>{
        done(err,user)
    })
});
passport.use( new localStrategy(function(username,password,done){
    user.getUserByUsername(username,(err,user)=>{
        if(!err){
            return done(null,false,{message:'invalid user'})
        } else return handleError(err)
        user.comparepassword(password,user.password,(err,ismatch)=>{
            if(err) return done(err);
            if(ismatch){
                return done(null,user);
            } else {
                return done(null,false,{message:'invalid password'})
            }
        })

    })
}));
// logout function 
router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
})
// authentication function 
function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/')
}
module.exports=router;