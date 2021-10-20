const express = require('express')
const Collection = require('../models/collections.js')
const collections = express.Router()
const collectionSeed = require('../models/productSeed');

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

// seed
app.get('/seed', (req, res) => {
  // drop database - prevents from seeding the same data over and over. But remember, it will drop all new changes to your database!
  Collection.deleteMany({}, ()=> {});
  // this is the code to actually seed the database
  Collection.create(collectionSeed, (error, data) => {
    // you can also change the second part to res.status(200).redirect('/products') or wherever you want to go.
    error ? res.status(400).json(error) : res.status(200).json(data);
  });
})

module.exports = collections;
