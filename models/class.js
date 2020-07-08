const mongoose=require('mongoose');

var classSchema=mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    instructor:{
        type:String
    },
    lessons:[
        {
            lesson_number:{
                type:String
            },
            lesson_title:{
                type:String
            },
            lesson_body:{
                type:String
            },
        }
    ]
});
var Class= module.exports=mongoose.model('Class',classSchema);
// fetch all classes 
module.exports.getClasses=(callback,limit)=>{
    Class.find(callback).limit(limit);
}

// fetch single class
module.exports.getClassById=(id,callback)=>{
    Class.findById(id,callback);
}
module.exports.addLesson=(info,callback)=>{
    classid=info['class_id'];
    lesson_number=info['lesson_number'];
    lesson_title=info['lesson_title'];
    lesson_body=info['lesson_body'];
    Class.findByIdAndUpdate(
        classid,
        {$push:{'lesson':{lesson_number:lesson_number,lesson_title:lesson_title,lesson_body:lesson_body}}},
        {safe:true,upsert:true},
        callback
    )
}
