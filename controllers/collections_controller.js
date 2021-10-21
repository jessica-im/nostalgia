const express = require('express')
const Collection = require('../models/collections.js')
const timecapsule = express.Router()
const collectionSeed = require('../models/collectionSeed.js');

// new
timecapsule.get('/new', (req, res) => {
    res.render('timecapsule/new.ejs')
})

// edit
timecapsule.get('/:id/edit', (req, res) => {
    Collection.findById(req.params.id, (error, foundCollection) => {
        res.render('timecapsule/edit.ejs', {
            collection: foundCollection
        })
    })
})

// delete
timecapsule.delete('/:id', (req, res) => {
    Collection.findByIdAndRemove(req.params.id, (err, deletedCollection) => {
        res.redirect('/timecapsule')
    })
})

// show
timecapsule.get('/:id', (req, res) => {
    Collection.findById(req.params.id, (error, foundCollection) => {
            res.render('timecapsule/show.ejs', {
                collection: foundCollection
        })
    })
})

// update
timecapsule.put('/:id', (req, res) => {
    console.log('updating...');
    Collection.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedModel) => {
            res.redirect('/timecapsule')
        }
    )
})

// create
timecapsule.post('/', (req, res) => {
    Collection.create(req.body, (error, createdCollection) => {
        res.redirect('/timecapsule')
    })
})

// index
timecapsule.get('/', (req, res) => {
    Collection.find({}, (error, fullCollection) => {
        res.render('timecapsule/index.ejs', {
            collections: fullCollection
        })
    })
})

// seed
timecapsule.get('/seed', (req, res) => {
  // drop database - prevents from seeding the same data over and over. But remember, it will drop all new changes to your database!
  Collection.deleteMany({}, ()=> {});
  // this is the code to actually seed the database
  Collection.create(collectionSeed, (error, data) => {
    // you can also change the second part to res.status(200).redirect('/products') or wherever you want to go.
    error ? res.status(400).json(error) : res.status(200).json(data);
  });
})

module.exports = timecapsule;
