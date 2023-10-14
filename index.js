require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// MIDDLEWARES
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())



// ENDPOINTs
const studentRoutes = require('./routes/studentRoutes')
app.use('/student', studentRoutes)



// SETTING PORT
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.md2jir7.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Conexão estabelecida! MongoDB")
        app.listen(3000)
    })
    .catch(
        (err) => console.log(err)
    )


