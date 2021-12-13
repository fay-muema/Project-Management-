const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Chat = mongoose.model(
    'chat',
    mongoose.Schema({
        user_id: String,
        project_id: String,
        fullname: String,
        text: String,
        date: String,
    })
);

router.post('/add', (req, res) => {
    const newChat = new Chat(req.body);
    try {
        newChat.save((err, c) => {
            if (err) res.send({ error: 'chat not added!!' });
            else {
                res.send({ data: c });
                Chat.find({ project_id: req.body.project_id }, (e, chats) => {
                    if (!e) {
                        // req.app.get('io').emit('chats', { data: chats });
                    }
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.send({ error: 'chat not added!!' });
    }
});

router.post('/newChat', (req, res) => {
    const newChat = new Chat(req.body);
    try {
        newChat.save((err, c) => {
            if (err) res.send({ error: 'chat not added!!' });
            else {
                // res.send({ data: c });
                Chat.find({ project_id: c.project_id }, (e, chats) => {
                    if (e) {
                        res.send({ error: 'Error getting chats' });
                    } else {
                        res.send({ data: chats });
                    }
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.send({ error: 'chat not added!!' });
    }
});

router.get('/:id', (req, res) => {
    Chat.find({ project_id: req.params.id }, (err, chats) => {
        if (err) {
            res.send({ error: 'Error getting chats' });
        } else {
            res.send({ data: chats });
        }
    });
});

router.get('/mychats/:arr', (req, res) => {
    Chat.find({ project_id: { $in: [...JSON.parse(req.params.arr)] } },
        (err, items) => {
            if (err) {
                res.send({ error: 'Error getting chats' });
            } else {
                res.send({ data: items });
            }
        }
    );
});

module.exports = router;
module.exports.Chat = Chat;