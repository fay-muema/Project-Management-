var express = require('express');
var router = express.Router();

var taskModel = require('../models/tasks');

router.get('/', function(req, res, next) {
    res.send('tasks');
});
//add task/:projectID

router.post('/add/:project_id', function(req, res, next) {
    let tasks = new taskModel({
        title: req.body.title,
        type: req.body.type,
        due_date: req.body.due_date,
        color: req.body.color,
        members: req.body.members,
        created_by: req.body.created_by,
        project_id: req.params.project_id,
    });

    tasks.save(function(err, tasks) {
        if (err) res.send({ error: 'task not added!!' });
        else {
            res.send({
                data: {
                    title: tasks.title,
                    type: tasks.type,
                    due_date: tasks.due_date,
                    color: tasks.color,
                    members: tasks.members,
                    created_by: tasks.created_by,
                },
            });
        }
    });
});
//del task
router.delete('/deleteTask', function(req, res, next) {
    taskModel.findByIdAndDelete({ _id: req.body.id }, function(err, response) {
        if (err) res.send(err);
        else res.send({ resultsFound: response.length, task_id: response });
    });
});
//update task

router.put('/update', function(req, res, next) {
    const id = req.query.taskId;
    const task = req.query.taskId;
    taskModel.update(id, { taskId: task }, function(err, response) {
        if (err) res.send(err);
        else res.send({ resultsFound: response.length, id: response });
    });
});
module.exports = router;