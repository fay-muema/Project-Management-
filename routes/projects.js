// => /projects/:id return {...project, tasks:[tasks]
var express = require('express');
var router = express.Router();

var projectModel = require('../models/projects');

router.get('/', function(req, res, next) {
    projectModel.find({}, (err, items) => {
        if (err) {
            res.send({ error: 'Error getting projects' });
        } else {
            res.send({ data: items });
        }
    });
});

//get project by id
router.get('/:id', (req, res) => {
    projectModel.findOne({ _id: req.params.id }, (err, p) => {
        if (err) {
            res.send({ error: 'Erroe getting project' });
        } else {
            res.send({ data: p });
        }
    });
});

//add project
router.post('/add', function(req, res, next) {
    let projects = new projectModel({
        title: req.body.title,
        type: req.body.type,
        color: req.body.color,
        due_date: req.body.due_date,
        tags: [],
        members: [req.body.created_by],
        created_by: req.body.created_by,
    });

    projects.save(function(err, p) {
        if (err) res.send({ error: 'project not added!!' });
        else {
            res.send({ data: p });
        }
    });
});

//del project
router.delete('/:id', function(req, res, next) {
    projectModel.findByIdAndDelete({ _id: req.params.id },
        function(err, response) {
            if (err) res.send({error:"could not delete"});
            else
                res.send({
                    data: response,
                });
        }
    );
});

//update project

router.put('/:id', function(req, res, next) {
    const id = req.params.id;
    // {title:'New Title',due_}
    projectModel.findOneAndUpdate({ _id: id }, req.body, (err, p) => {
        if (err) {
            res.send({ err: 'project not updated' });
        } else {
            console.log(p);
            res.send({ data: p });
        }
    });
});

module.exports = router;