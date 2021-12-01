const mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
    title: String,
    type: String,
    color: String,
    due_date: String,
    members: [{ fullname: String, user_id: String }],
    tags: [{ id: String, title: String, color: String }],
    created_by: String,
});
let projectModel = mongoose.model('Projects', projectSchema);
module.exports = projectModel;