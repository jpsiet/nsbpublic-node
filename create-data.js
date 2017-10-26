var length  = 20;
var ratings = [1,2,3,4,5];
var subjects = ['math','english','science','hindi','computer'];

var totalTeacher = [];

for(var i =0; i< length; i++){

	var obj = {
		'name' : 'name' + 1,
		'rating':ratings[i%5],
		'subject':subjects[i%5]

	}
	totalTeacher.push(obj);

}

console.log(JSON.stringify(totalTeacher));