const express = require('express')
const Item = require('../models/item.js')
const timecapsule = express.Router()
const collectionSeed = require('../models/collectionSeed.js');

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next()
    } else {
        res.redirect('/sessions/new')
    }
}

// new
timecapsule.get('/new', isAuthenticated, (req, res) => {
    res.render('timecapsule/new.ejs', {currentUser: req.session.currentUser})
})

// edit
timecapsule.get('/:id/edit', isAuthenticated, (req, res) => {
    Item.findById(req.params.id, (error, foundItem) => {
        res.render('timecapsule/edit.ejs', {
            item: foundItem,
            currentUser: req.session.currentUser
        })
    })
})

// delete
timecapsule.delete('/:id', isAuthenticated, (req, res) => {
    Item.findByIdAndRemove(req.params.id, (err, deletedItem) => {
        res.redirect('/timecapsule')
    })
})

// show
timecapsule.get('/:id', (req, res) => {
    Item.findById(req.params.id, (error, foundItem) => {
            res.render('timecapsule/show.ejs', {
                item: foundItem,
                currentUser: req.session.currentUser
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
    // req.body.user = req.session.currentUser
    Item.create(req.body, (error, createdItem) => {
        res.redirect('/timecapsule')
    })
})

// index
timecapsule.get('/', (req, res) => {
    Item.find({}, (error, fullCapsule) => {
        res.render('timecapsule/index.ejs', {
            timeCapsule: fullCapsule,
            currentUser: req.session.currentUser
        })
    })
})

module.exports = timecapsule;
