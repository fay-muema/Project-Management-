const mongoose = require('mongoose');

let taskSchema = mongoose.Schema({
    title: String,
    status: Number,
    due_date: String,
    project_id: String,
    assigned: String,
    tags: [String],
    start_date: String,

    created_by: String,
});
let taskModel = mongoose.model('Tasks', taskSchema);
module.exports = taskModel;