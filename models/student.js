const mongoose=require('mongoose');
const bcrypt= require('bcrypt');

var studentSchema=mongoose.Schema({
    f_name:{
        type:String
    },
    l_name:{
        type:String
    },
    username:{
        type:String
    },
    email:{
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

        }
    }],
    class:[
        {
            class_id:{
                type:[mongoose.Schema.Types.ObjectId]
            },
            class_title:{
                type:String
            },
        }
    ]
});
var student=module.exports=mongoose.model('Studet',studentSchema);

module.exports.getStudentByUsername=(username,callback)=>{
    var query={username:username};
    student.findOne(query,callback)
}

module.exports=register=(info,callback)=>{
    Student_username=info['student_username'];
    class_id=info['class_id'];
    class_title=info['class_title'];
    var query={username:Student_username};
    Student.findOneAndUpdate(
        query,
        {$push:{class:{class_id:class_id,class_title:class_title}}},
        {safe:true,upsert:true},
        callback
    )
}