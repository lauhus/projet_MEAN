const Task = require('../model/task.model')

exports.getList = (req, res) => {
  Task.find().then((tasks) => {
    res.status(200).json(tasks)
  }).catch(error => res.status(400).json({ error }))

}
exports.getItem = (req, res) => {
  Task.findOne({
    _id: req.params.id
  }).then((task) => {
    res.status(200).json(task)
  }).catch(error => res.status(400).json({ error }))
}



exports.patchItem = (req, res) => {
  const id = req.params.id
  const task = req.body

  Task.findByIdAndUpdate( {_id: id }, task, (err, taskUpdated) => {
    if (err) res.status(400).json(err)
    else  res.status(201).json(taskUpdated)
  } )
}

exports.putItem = (req, res) => {
  const id = req.params.id
  const task = req.body

  Task.updateOne( {_id: id }, task).then(()=>{
    res.status(201).json({
      message: 'Task mise à jour'
    })
  })
}

exports.deleteItem = (req, res) => {
  Task.deleteOne({
    _id: req.params.id
  }).then((task) => {
    res.status(201).json({
      message: 'Task supprimée'
    })
  }).catch(error => res.status(400).json({ error }))
}