// => /projects/:id return {...project, tasks:[tasks]
var express = require('express');
var router = express.Router();

var projectModel =  require("../models/projects");

router.get('/', function(req, res, next) {
    res.send('projects');
  });
 
//add project
router.post('/add', function(req, res, next) {
  let projects = new projectModel ({
    title:req.body.title,
    status:req.body.status,
    due_date:req.body.due_date,
    project_id:req.body.project_id,
    assigned:req.body.assigned,
    tags:req.body.tags,
    created_by:req.body.created_by

  });
  

    projects.save(function(err, projects){
      if (err)
      res.send({error:'project not added!!'})  
      else{
        res.send({data:{title:projects.title,status:projects.status,due_date:projects.due_date, _id:projects._id,assigned:projects.assigned,tags:projects.tags,created_by:projects.created_by}});
      }                
      
  });
});
//finding LIST
router.get('/list', function(req, res, next) {

  
    projectModel.find( function(err, response){
      if (err)
      res.send(err)  
      else
      res.send({project: response});
      
      
    });
  
  
  });


//del project
router.delete('/deleteUser', function(req, res, next) {


    projectModel.findByIdAndDelete({_id:req.body.id}, function(err, response){
      if (err)
      res.send(err)  
      else
      res.send({resultsFound:response.length,project_id: response});
      
      
    });
  
  
  });

//update project

router.put('/update', function(req, res, next) {
const id = req.query.projectId;
  const project = req.query.projectId;
    projectModel.update(id,{projectId: project}, function(err, response){
      if (err)
      res.send(err)  
      else
      res.send({resultsFound:response.length, id: response});
      
      
    });
  
  
  });

//add task/:projectID

//del task


//update task
module.exports = router;