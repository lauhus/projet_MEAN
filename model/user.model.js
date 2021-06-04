const mongoose = require('../mongoose');

const User = new mongoose.Schema({
    name: { type : String },
    pass: { type :String } ,
    mail: { type : String },
    tasks : [
        {  type: mongoose.Schema.Types.ObjectId,
        ref: "Task"}
    ]
})

module.exports = mongoose.model('User', User)