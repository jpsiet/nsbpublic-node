var mongoose = require('mongoose');

// Student Schema
var studentSchema = mongoose.Schema({
	firstName:{
		type:String
	},
	subject:{
		type:String
	},
	id:{
		type:Number
	},
	rollNumber:{
		type:Number,
		required:true
	},
	standard:{
		type:Number
	},
	rating:{
		type:Number
	}
})


var Student = module.exports = mongoose.model('Student',studentSchema);


module.exports.getStudents = function(callback,limit){

	Student.find(callback).limit(limit);
}

module.exports.getStudentById = function(id,callback){

	Student.findById(id,callback)
}


module.exports.addStudent = function(student,callback){

	Student.create(student,callback)
}


module.exports.updateStudent = function(id,student,options,callback){
      
      var query = {_id:id};
      var update = {
        rating:student.rating,
        standard:student.standard,
        subject:student.subject,
        firstName:student.firstName,
        rollNumber:student.rollNumber,
      }
	
	Student.findOneAndUpdate(query,update,options,callback)
}


module.exports.removeStudent = function(id,callback){
      
      var query = {_id:id};

      Student.remove(query,callback)
}
