var PORT = process.argv[2] && parseInt(process.argv[2], 10) || 9000;
var STATIC_DIR = __dirname + '/';
var STUDENT_FILE = __dirname + '/data/student.json';
require('./index').start(PORT, STATIC_DIR,STUDENT_FILE);
