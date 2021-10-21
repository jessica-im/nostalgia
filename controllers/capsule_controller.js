const express = require('express')
const Item = require('../models/item.js')
const timecapsule = express.Router()
const collectionSeed = require('../models/collectionSeed.js');

// new
timecapsule.get('/new', (req, res) => {
    res.render('timecapsule/new.ejs')
})

// edit
timecapsule.get('/:id/edit', (req, res) => {
    Item.findById(req.params.id, (error, foundItem) => {
        res.render('timecapsule/edit.ejs', {
            item: foundItem
        })
    })
})

// delete
timecapsule.delete('/:id', (req, res) => {
    Item.findByIdAndRemove(req.params.id, (err, deletedItem) => {
        res.redirect('/timecapsule')
    })
})

// show
timecapsule.get('/:id', (req, res) => {
    Item.findById(req.params.id, (error, foundItem) => {
            res.render('timecapsule/show.ejs', {
                item: foundItem
        })
    })
})

// update
timecapsule.put('/:id', (req, res) => {
    console.log('updating...');
    Item.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedItem) => {
            res.redirect('/timecapsule')
        }
    )
})

// create
timecapsule.post('/', (req, res) => {
    Item.create(req.body, (error, createdItem) => {
        res.redirect('/timecapsule')
    })
})

// index
timecapsule.get('/', (req, res) => {
    Item.find({}, (error, fullCapsule) => {
        res.render('timecapsule/index.ejs', {
            timeCapsule: fullCapsule
        })
    })
})

// seed
timecapsule.get('/seed', (req, res) => {
  // drop database - prevents from seeding the same data over and over. But remember, it will drop all new changes to your database!
  Item.deleteMany({}, ()=> {});
  // this is the code to actually seed the database
  Item.create(collectionSeed, (error, data) => {
    // you can also change the second part to res.status(200).redirect('/products') or wherever you want to go.
    error ? res.status(400).json(error) : res.status(200).json(data);
  });
})

module.exports = timecapsule;
