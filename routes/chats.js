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
    newChat.save((err, c) => {
        if (err) res.send({ error: 'chat not added!!' });
        else {
            res.send({ data: c });
        }
    });
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

module.exports = router;