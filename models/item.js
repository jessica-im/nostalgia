const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    item: {type: String, required: true},
    // user: String,
    name: String,
    location: String,
    date: String,
    img: String,
    words: String,
    memory: String,
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item;
