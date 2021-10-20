const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    img: String,
    memory: String,
    location: String,
    date: String,
})

const Collection = mongoose.model('Collection', collectionSchema)

module.exports = Collection;
