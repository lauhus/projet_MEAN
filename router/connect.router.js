const express = require('express')
const router = express.Router()

const ctrl = require('../controller/connect.controller')


router.post('/' , ctrl.connect)


module.exports = router