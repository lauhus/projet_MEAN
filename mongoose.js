let mongoose = require('mongoose')

const uri = "mongodb+srv://laurine:laurine@cluster0.m1xrl.mongodb.net/Cluster0?retryWrites=true&w=majority";

mongoose.connect(uri,{ useUnifiedTopology: true },{useNewUrlParser: true})
  .then(
    () => {
    console.log('Base de donnée connectée');
    },
    err => console.error('mongo non connecté :' + err))


module.exports = mongoose