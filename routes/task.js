var express = require('express');
var router = express.Router();

var taskModel = require('../models/tasks');

router.get('/', function(req, res, next) {
    res.send('tasks');
});
//add task/:projectID

router.post('/add/:project_id', function(req, res, next) {
    let tasks = new taskModel({

    
        title: req.body.id,
        status: req.body.status,
        due_date:req.body.due_date,
        project_id: req.params.project_id,
        assigned: req.body.assigned,
        tags:  [],
        created_by: req.body._id,
      
        start_date:req.body.start_date
    });

    tasks.save(function(err, tasks) {
        if (err) res.send({ error: 'task not added!!',err });
        else {
            res.send({
                data: tasks
                
            });
        }
    });
});
//del task
router.delete('/:id', function(req, res, next) {
    taskModel.findByIdAndDelete({ _id: req.params.id },
        function(err, response) {
            if (err) res.send({error:"could not delete"});
            else
                res.send({
                    data: response,
                });
        }
    );
});
//find user

router.get('findUser', function(req, res, next) {
    taskModel.findOne({email:email},
        function(err, response) {
            if (err) res.send({error:"could not find user!!!"});
            else
                res.send({
                    data: response,
                });
        }
    );
});
//update task
router.put('/:id', function(req, res, next) {
    const id = req.params.id;
    // {title:'New Title',due_}
    taskModel.findOneAndUpdate({ _id: id }, req.body, (err, p) => {
        if (err) {
            res.send({ err: 'project not updated' });
        } else {
            console.log(p);
            res.send({ data: p });
        }
    });
});
module.exports = router;