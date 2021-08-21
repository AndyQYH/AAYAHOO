

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express') //import express server
const app = express()              // get the express app
const expressLayouts = require('express-ejs-layouts')//import express layouts


const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose') //database configuration library for mongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter) //tell express to use the js file in routes folder

app.listen(process.env.PORT || 3000)// tell express to check port number