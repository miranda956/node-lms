 var express = require("express");
 var  cookieparser=require('cookie-parser');
 var  path =require('path');
 var  bodyparser=require('body-parser');
 var  session=require('express-session');
 var  winston=require('winston');
 var expresswinston=require('express-winston');
 var passport =require('passport');
var  exphbs=require('express-handlebars');
var  app=express();
require('./models/config');
var routes=require('./routes/index');
var Class=require('./routes/class');
var Instructor=require('./routes/instructor');
var User=require('./routes/users');
var Student=require('./routes/student');
app.use(cookieparser());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(session({
    secret:'12345',
    resave:true,
    saveUninitialized:true
}));
app.use(expresswinston.logger({
    transports:[
        new winston.transports.Console({
            json:true, 
            colirize:true
        }),
        new winston.transports.File({
            filename:'logs/success.log'
        })
    ]
}));
app.use(expresswinston.errorLogger({
    transports:[
        new winston.transports.Console({
            json:true,
            colirize:true,
            
        }),
        new winston.transports.File({
            filename:'logs/error.log'
        })
    ]
}));
// set up handlebars 
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    extname:'.hbs',
    layoutsDir:'./views/layouts',
    partialsDir:'./views/partials'

}))
app.set('view engine','.hbs');
 
app.use('/',routes);
app.use('/instructor',Instructor);
app.use('/User',User);
app.use('/Class',Class);
app.use('/Students',Student)


const PORT  = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT } 🔥`));

