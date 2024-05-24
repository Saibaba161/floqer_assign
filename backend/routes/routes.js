const express = require('express')

const router = express.Router()


//controller functions
const { getData, getSingleData } = require('../controller')


router.get('/', getData)

router.post('/year', getSingleData)

module.exports = router