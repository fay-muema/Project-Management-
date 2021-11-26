const mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
    title: String,
    type: String,
    color: String,
    due_date: String,
    members: [String],
    tags: [String],
    created_by: String,
});
let projectModel = mongoose.model('Projects', projectSchema);
module.exports = projectModel;