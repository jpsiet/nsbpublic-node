var PORT = process.argv[2] && parseInt(process.argv[2], 10) || 3000;
var STATIC_DIR = __dirname + '/';

var TEACHER_FILE = __dirname + '/data/teachers.json';
var STUDENT_FILE = __dirname + '/data/student.json';

require('./index').start(PORT, STATIC_DIR, TEACHER_FILE,STUDENT_FILE);
