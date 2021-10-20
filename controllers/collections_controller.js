const express = require('express')
const Collection = require('../models/collections.js')
const collections = express.Router()

// new
collections.get('/new', (req, res) => {
    res.render('collections/new.ejs', {currentUser: req.session.currentUser})
})

// edit
collections.get('/:id/edit', (req, res) => {
    Collection.findById(req.params.id, (error, foundCollection) => {
        res.render('collections/edit.ejs', {
            collection: foundCollection,
            currentUser: req.session.currentUser
        })
    })
})

// delete
collections.delete('/:id', (req, res) => {
    Collection.findByIdAndRemove(req.params.id, (err, deletedCollection) => {
        res.redirect('/collections')
    })
})

// show
collections.get('/:id', (req, res) => {
    if (req.session.currentUser) {
        Collection.findById(req.params.id, (error, foundCollection) => {
            res.render('collections/show.ejs', {
                collection: foundCollection,
                currentUser: req.session.currentUser
            })
        })
    } else {
        res.redirect('/sessions/new')
    }
})

// update
collections.put('/:id', (req, res) => {
    Collections.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedModel) => {
            res.redirect('/collections')
        }
    )
})

// create
collections.post('/', (req, res) => {
    Collection.create(req.body, (error, createdCollection) => {
        res.redirect('/collections')
    })
})

// index
collections.get('/', (req, res) => {
    Collection.find({}, (error, fullCollection) => {
        res.render('collections/index.ejs', {
            collections: fullCollection
        })
    })
})

module.exports = collections;
