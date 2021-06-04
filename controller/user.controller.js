const User = require('../model/user.model')
const Task = require('../model/task.model')

exports.getList = (req, res) => {
  User.find().populate('tasks').then((users) => {
    res.status(200).json(users)
  }).catch(error => res.status(400).json({ error }))

}

exports.getItem = (req, res) => {
  User.findOne({
    _id: req.params.id
  }).populate('tasks').then((user) => {
    res.status(200).json(user)
  }).catch(error => res.status(400).json({ error }))
}

exports.postItem = (req, res) => {
  console.log(req.body)
  const user = new User({
    name : req.body.name,
    mail : req.body.mail,
    pass : req.body.pass
  })
    user.save().then((data) => {
    res.status(201).json({
      data
    })
  }).catch(error => res.status(400).json({ error }))
}

exports.postTask = (req ,res) => {
  var userId = req.params.id

  const task = new Task({title: req.body.title,content: req.body.content,state : req.body.state})
    task.save().then((task) => {
      User.findByIdAndUpdate({_id: userId })
      .then((user) => {
        user.tasks.push(task._id)
        user.save();
        res.json({task: task})
      }) 
    })
    .catch(error => res.status(400).json({ error }))
}

exports.patchItem = (req, res) => {
  const id = req.params.id
  const user = req.body

  User.findByIdAndUpdate( {_id: id }, user, (err, userUpdated) => {
    if (err) res.status(400).json(err)
    else  res.status(201).json(userUpdated)
  } )
}

exports.putItem = (req, res) => {
  const id = req.params.id
  const user = req.body

  User.updateOne( {_id: id }, user).then(()=>{
    res.status(201).json({
      message: 'User mise à jour'
    })
  })
}

exports.deleteItem = (req, res) => {
  User.deleteOne({
    _id: req.params.id
  }).then((user) => {
    res.status(201).json({
      message: 'User supprimée'
    })
  }).catch(error => res.status(400).json({ error }))
}