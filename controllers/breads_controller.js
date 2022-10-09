const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

// New
breads.get('/new', (req, res) => {
    res.render('new')
})

// Index
breads.get('/', (req, res) => {
    Bread.find()
        .then(foundBreads => {
            //console.log(foundBreads)
            res.render('index', {
              breads: foundBreads,
              title: 'Index Page'
            })
        })
    })    

// Edit
breads.get('/:indexArray/edit', (req, res) => {
    res.render('edit', {
        bread: Bread[req.params.indexArray],
        index: req.params.indexArray
    })
})

// Show
breads.get('/:id', (req, res) => {
    Bread.findById(req.params.id)
        .then(foundBread => {
            res.render('show', {
                bread: foundBread
            })
        })
        .catch(err => {
            res.send('404')
        })
})

// Create
breads.post('/', (req, res) => {
    if (!req.body.image) {
        req.body.image = undefined
    }
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = 'true'
    } else {
        req.body.hasGluten = 'false'
    }
    Bread.create(req.body)
    res.redirect('/breads')
})

// Delete
breads.delete('/:indexArray', (req, res) => {
    Bread.slice(req.params.indexArray, 1)
    res.status(303).redirect('/breads')
})

// Update
breads.put('/:arrayIndex', (req, res) => {
    if(req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    Bread[req.params.arrayIndex] = req.body
    res.redirect(`/breads/${req.params.arrayIndex}`)
})

module.exports = breads