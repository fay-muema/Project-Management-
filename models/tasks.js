const mongoose = require ("mongoose");

let taskSchema =  mongoose.Schema({

})
let taskModel = mongoose.model("Tasks", taskSchema);
module.exports = taskModel;