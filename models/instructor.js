const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
var instructorSchema=mongoose.Schema({
    f_name:{
        type:String
    },
    l_name:{
        type:String
    },
    address:[{
        street_address:{
            type:String
        },
        city:{
            type:String
        },
        state:{
            type:String
        },
        zip:{
            type:String
        },
    }],
    email:{
        type:String
    },
    class:[{
        class_id:{
            type:[mongoose.Schema.Types.ObjectId]
        },
        class_title:String
    }]
});
var instructor=module.exports=mongoose.model('Instructor',instructorSchema);

module.exports.getInstructorByUsername=(username,callback)=>{
    var query={username:username};
    Instructor.findOne(query,callback)
}
module.exports.regester=(info,callback)=>{
    Instructor_username=info['instructor_username'];
    class_id=info['class_id'];
    class_title=info['class_title'];
    var query={username:Instructor_username};
    Instructor.findOneAndUpdate(
        query,
        {$push:{class:{class_id:class_id,class_title:class_title}}},
        {safe:true,upsert:true},
        callback
    )
}