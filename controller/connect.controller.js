let User = require('../model/user.model')
const jwt = require('jsonwebtoken');




exports.connect = (req, res) => {
    let mail  = req.body.mail
    let pass = req.body.pass
    User.find({ mail : mail , pass : pass})
    .then(user => {
        res.status(200).json({
            userId : user[0]._id,
            token : jwt.sign({ userId : user[0]._id} , "TOKEN", { expiresIn : '24h'}) 
        });
    }).catch(error => res.status(500).json({error}));
}


