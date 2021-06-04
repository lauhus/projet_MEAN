const mongoose = require('../mongoose');

const Task = new mongoose.Schema({
    title: { type : String },
    content: { type :String },
    state: { type : Number }
})


module.exports = mongoose.model('Task', Task)