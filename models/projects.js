const mongoose = require ("mongoose");

let projectSchema = mongoose.Schema({

    title: String,
    status: Int16Array,
    due_date: String,
    project_id: String,
    assigned: String,
    // tags: [String],
    created_by: String

})
let projectModel = mongoose.model("Projects", projectSchema);
module.exports = projectModel;