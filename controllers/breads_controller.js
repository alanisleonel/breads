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
breads.get('/:id/edit', (req, res) => {
    Bread.findById(req.params.id)
    .then(foundBread => {
        res.render('edit', {
            bread: foundBread
        })
    })
    .catch(err => {
        res.send('404')
    })
})

// Show
breads.get('/:id', (req, res) => {
    Bread.findById(req.params.id)
        .then(foundBread => {
            const bakedBy = foundBread.getBakedBy()
            console.log(bakedBy)
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
breads.delete('/:id', (req, res) => {
    Bread.findByIdAndDelete(req.params.id)
    .then(deletedBread => {
        res.status(303).redirect('/breads')
    })
    
})

// Update
breads.put('/:id', (req, res) => {
    if(req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    //findByIdAndUpdate helper
    Bread.findByIdAndUpdate(req.params.id, req.body, {new: true})
     .then(updatedBread => {
         console.log(updatedBread)
         res.redirect(`/breads/${req.params.id}`)
        })
})

module.exports = breads