  var express = require('express');
  var fs = require('fs');
  var bodyParser = require('body-parser');

   if(process.env.USERNAME === 'manviya'){

    console.log("running locally");
     var mongoose = require('mongoose');
      mongoose.connect('mongodb://localhost/students', { useMongoClient: true });
      var db = mongoose.connection;
   }
  

  Student = require('./model/student')

  var teacher_url = '/api/teachers';
  var student_url = '/api/students';

  var teachers = [];
  var students = [];


  // In order to AVIOD  deplying DB on AWS, we are writing both form of serving
  // in file system as well in DB with mongoose(DB portion run with local set up)

  exports.start = function(PORT, STATIC_DIR,STUDENT_FILE) {


    
    var app = express();
   // app.use(bodyParser.json());
    // log requests
    /*app.use(express.logger('dev'));*/

    // serve static files for demo client
    app.use(express.static(STATIC_DIR));

    // parse body into req.body
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json());
 
  // parse application/vnd.api+json as json


   app.get('/', function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     
       res.send('HEY!')
    });




  // Get Students
   app.get('/local/api/students', function(req,res,next){

    console.log( "Calling sutdnet Get Request");


    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        Student.getStudents(function(err,students){
          if(err){
            throw err;
          }
           res.send(students);
        })

   });

    // Add Students  API
   app.post('/local/api/students', function(req,res,next){
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var student = req.body;
         Student.addStudent(student, function(err,student){
          if(err){
            throw err;
          }
           res.send(student);
        })

   });

    // Update Students  API
   app.put('/local/api/students/:_id', function(req,res,next){
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var id = req.params._id;
        var student = req.body;
         Student.updateStudent(id,student,{}, function(err,student){
          if(err){
            throw err;
          }
           res.send(student);
        })

   });


  // Get student by ID
    app.get('/local/api/students/:_id', function(req,res,next){
  
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        Student.getStudentById(req.params._id,function(err,student){
          if(err){
            throw err;
          }
           res.send(student);
        })
        

   });


    // Delete student by ID
    app.delete('/local/api/students/:_id', function(req,res,next){

      console.log("Deleting student")
  
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        Student.removeStudent(req.params._id,function(err,student){
          if(err){
            throw err;
          }
           res.send(student);
        })
        

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

     fs.readFile(STUDENT_FILE, function(err, data) {
           students = data;
            app.listen(PORT, function(){
            console.log('app is running on 9000 port');
        })
      });


  };
