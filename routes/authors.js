const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//All Author Route
router.get('/', async(req, res) =>{
    let searchOptions = {}
    if(req.query.name !== null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
        console.log(searchOptions.name)
    }
    try{
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query

        })
        console.log("successfully searched for an author")
    }catch{
        res.redirect('/')
        console.log("error")
    }
})

//New Author Route
router.get('/new', (req, res) => {
    res.render('authors/new', {author: new Author() })
})

//Create Author Route
router.post('/', async(req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try{
        const newAuthor = await author.save()  //wait for asyn function to save other's data to assign
        res.redirect(`authors`)
    }catch{
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    }
})
/*
 
    author.save((err, newAuthor) => {
        if(err){
            res.render('authors/new',{
                author:author,
                errorMessage: 'Error creating Author'
            })
        }else{
            res.redirect(`authors`)///${newAuthor.id}`)
        }
    })
*/


module.exports = router