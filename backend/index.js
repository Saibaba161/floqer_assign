require('dotenv').config()

const express = require('express')
const mongoose  = require('mongoose')
const cors = require('cors')


const routes = require('./routes/routes')

//express app
const app = express()

app.use(cors(
    {
    origin: ['https://floqer-assign-frontend.vercel.app'],
    methods: ['POST', 'GET', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type']
    }
))


//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


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
