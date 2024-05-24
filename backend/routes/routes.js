const express = require('express')

const router = express.Router()

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "https://floqer-assign-frontend.vercel.app/");
    next()
});

//controller functions
const { getData, getSingleData } = require('../controller')


router.get('/', getData)

router.post('/year', getSingleData)

module.exports = router