const express = require('express')
const routerTask = express.Router()

const auth = require('../middleware/auth')

const ctrl = require('../controller/task.controller')

routerTask.get('/', auth , ctrl.getList )
routerTask.get('/:id', auth, ctrl.getItem)
routerTask.put('/:id', auth,  ctrl.putItem)
routerTask.patch('/:id', auth , ctrl.patchItem)
routerTask.delete('/:id', auth , ctrl.deleteItem)

module.exports = routerTask