// => /projects/:id return {...project, tasks:[tasks]}
var express = require('express');
var router = express.Router();

// var projectModel =  require("../models/projects");

router.get('/', function(req, res, next) {
    res.send('tasks and projects');
  });
 
//add project

//del project

//update project

//add task/:projectID

//del task


//update task
module.exports = router;