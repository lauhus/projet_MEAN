const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')

const ctrl = require('../controller/user.controller')

router.get('/', auth, ctrl.getList)

router.get('/:id', auth , ctrl.getItem)
router.post('/', ctrl.postItem)
router.post('/:id/task' , ctrl.postTask)
router.put('/:id', auth, ctrl.putItem)
router.patch('/:id', auth, ctrl.patchItem)
router.delete('/:id', auth,  ctrl.deleteItem)

module.exports = router