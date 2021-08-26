
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express') //import express server
const app = express()              // get the express app
const expressLayouts = require('express-ejs-layouts')//import express layouts
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
app.use(methodOverride('_method')) //used for add/delete the book data

const mongoose = require('mongoose') //database configuration library for mongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter) //tell express to use the js file in routes folder
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

app.listen(process.env.PORT || 3000)// tell express to check port number