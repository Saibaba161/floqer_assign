require('dotenv').config()

const express = require('express')
const mongoose  = require('mongoose')
const cors = require('cors')

const routes = require('./routes/routes')

//express app
const app = express()

//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use(corsOptions)

corsOptions = {
    origin: ['https://floqer-assign-frontend.vercel.app/','https://floqer-assign-backend.vercel.app/api/data/:year'],
    methods: ['POST', 'GET', 'OPTIONS'],
    credentials: true,
    allowedHeaders: 'Content-Type:application/json'
}

//routes
app.use('/api/data', routes)

//Connecting to DB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB & Listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
