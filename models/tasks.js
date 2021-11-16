const mongoose = require ("mongoose");

let taskSchema =  mongoose.Schema({
    title: String,
    type: String,
    color: String,
    members:[String],
    due_date: String,
    created_by: String

})
let taskModel = mongoose.model("Tasks", taskSchema);
module.exports = taskModel;