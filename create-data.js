var length  = 50
var ratings = [1,2,3,4,5,6,7,8];
var fs = require('fs');
var rollNumber = [];
var subjects = ['Math','English','Science','Hindi','Computer'];
var firstName = ['Ethan','Ethen','William','Ryan','Aidan','Jonathan','David','Tyler','Alexander','Christian',
'James','Brian','Caleb','Samuel','Benjamin','Justin','Nathan','Nathen','Connor','Jayden','Jaden',
'Jose','Logan','Cameron','Sean','Isaiah','Hunter','Angel','Devin','Devon','Devan','Deven','Gavin','Gaven',
'Aaron','Kyle','Brayden','Braden','Braeden','Collin','Dominick', 'Nathanael','Nathanial','Lukas','Carlos','Adrien'];

var totalTeacher = [];
var STUDENT_FILE = __dirname + '/data/student.json';
// get roll number 

for(let i=1; i<length+1; i++){

    rollNumber.push(i);

}

for(var i =0; i< length; i++){

	var randomRating = Math.round(Math.random()*6) + 1;
	var randomStandard = Math.round(Math.random()*6) + 1;
	var randomSubject= Math.round(Math.random()*3) + 1;
	var randomName =   Math.round(Math.random()* (firstName.length -2)) +1;
	var obj = {
		'id':i,
		'rating':ratings[randomRating],
		'standard':ratings[randomStandard],
		'subject':subjects[randomSubject],
		'firstName':firstName[randomName],
		'rollNumber':rollNumber[i]

	}
	totalTeacher.push(obj);

}

console.log(length + " student created succesfully");

  fs.writeFile(STUDENT_FILE, JSON.stringify(totalTeacher), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
          });