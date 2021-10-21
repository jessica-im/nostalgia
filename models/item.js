const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    location: String,
    date: String,
    img: String,
    words: String,
    memory: String,
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item;
