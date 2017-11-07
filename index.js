var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');



var teacher_url = '/api/teachers';
var student_url = '/api/students';

var teachers = [];
var students = [];

exports.start = function(PORT, STATIC_DIR,  TEACHER_FILE,STUDENT_FILE) {
  var app = express();
 

  // log requests
  /*app.use(express.logger('dev'));*/

  // serve static files for demo client
  app.use(express.static(STATIC_DIR));

  // parse body into req.body
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



 app.get('/', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   
     res.send('HEY!')
  });
  // API
  app.get(teacher_url, function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   
    res.send(200, JSON.parse(teachers ));
  });

  
   app.get(student_url, function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   
    res.send(200, JSON.parse(students));
  });


 app.post(student_url, function(req, res, next) {
   /*  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   
    res.send(200, JSON.parse(students));*/
      res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   

    console.log(req.body.length);
    var newData = req.body;
var oldData = JSON.parse(students);
    for(var i =0; i<newData.length; i++){
      oldData.push(newData[i]);
    }

    fs.unlink(STUDENT_FILE, (err) => {
      if (err) throw err;
        
        fs.writeFile(STUDENT_FILE, JSON.stringify(oldData), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
          });

    });

    res.send({message:'student data  saved sucessfully'});
  });



  // start the server
  // read the data from json and start the server
  fs.readFile(TEACHER_FILE, function(err, data) {
   
       teachers = data;
       app.listen(PORT, function(){
          console.log('app is running on 9000 port');
      })
  });


 fs.readFile(STUDENT_FILE, function(err, data) {
       students = data;
  });




};
