var express = require('express');
var router = express.Router();

var taskModel = require('../models/tasks');

router.get('/mytasks/:arr', (req, res) => {
    taskModel.find({ project_id: { $in: [...JSON.parse(req.params.arr)] } },
        (err, items) => {
            if (err) {
                res.send({ error: 'Error getting projects' });
            } else {
                res.send({ data: items });
            }
        }
    );
});

router.get('/', function(req, res, next) {
    taskModel.find({}, (err, items) => {
        if (err) {
            res.send({ error: 'Error getting tasks' });
        } else {
            res.send({ data: items });
        }
    });
});
//add task/:projectID

router.post('/add', function(req, res, next) {
    let tasks = new taskModel({
        title: req.body.title,
        status: req.body.status,
        due_date: req.body.due_date,
        project_id: req.body.project_id,
        assigned: null,
        tags: [],
        created_by: req.body.created_by,

        start_date: req.body.start_date,
    });

    tasks.save(function(err, tasks) {
        if (err) res.send({ error: 'task not added!!', err });
        else {
            res.send({
                data: tasks,
            });
        }
    });
});
//del task
router.delete('/:id', function(req, res, next) {
    taskModel.findByIdAndDelete({ _id: req.params.id },
        function(err, response) {
            if (err) res.send({ error: 'could not delete' });
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

    taskModel.findOneAndUpdate({ _id: id },
        req.body, { new: true },
        (err, t) => {
            if (err) {
                res.send({ err: 'task not updated', err });
            } else {
                res.send({ data: t });
            }
        }
    );
});
module.exports = router;