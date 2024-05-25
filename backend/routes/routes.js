const express = require('express')

const router = express.Router()


//controller functions
const { getData, getSingleData } = require('../controller')


router.get('/', getData)

router.get('/2020', getSingleData)

router.get('/2021', getSingleData)

router.get('/2022', getSingleData)

router.get('/2023', getSingleData)

router.get('/2024', getSingleData)

module.exports = router