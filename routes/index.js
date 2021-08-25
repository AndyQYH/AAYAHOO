const express = require('express')
const router = express.Router()
const Book = require('../models/book')


router.get('/', async(req, res) => {
    let books
    try{
        books = await Book.find().sort({ createAt: 'desc' }).limit(10).exec() //sorting roles
    }catch{
        books = []
    }
    res.render('index', {books: books})
    console.log('index page rendered')
})

module.exports = router