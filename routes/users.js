var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

var userModel = require('../models/logins');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('login successful!!!');
});
router.post('/register', function(req, res, next) {
    let registerDetails = new userModel({
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
    });

    registerDetails.save(function(err, register) {
        if (err) res.send({ error: 'Not successfull' });
        else {
            res.send({
                data: {
                    fullname: registerDetails.fullname,
                    email: registerDetails.email,
                    _id: registerDetails._id,
                },
            });
        }
    });
});

router.post('/login', async(req, res, next) => {
    try {
        userModel.findOne(req.body, (err, user) => {
            if (err) {
                res.send({ error: 'Invalid username or password' });
            } else {
                res.send({ data: user });
            }
        });
    } catch (e) {
        res.send({ error: 'Invalid username or password' });
    }
});

router.get('/user/:email', async(req, res) => {
    try {
        userModel.findOne({ email: req.params.email }, (err, user) => {
            if (err) {
                res.send({ error: 'No such user' });
            } else {
                res.send({ data: user });
            }
        });
    } catch (e) {
        res.send({ error: 'No such user' });
    }
});
router.get('/userID/:userID', async(req, res) => {
    try {
        userModel.findOne({ _id: req.params.userID }, (err, user) => {
            if (err) {
                res.send({ error: 'No such user' });
            } else {
                res.send({ data: user });
                console.log(user);
            }
        });
    } catch (e) {
        res.send({ error: 'No such user' });
    }
});

module.exports = router;