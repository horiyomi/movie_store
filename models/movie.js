const mongoose = require('mongoose');

let schema = mongoose.Schema
let movieSchema = new schema({
    title:  String,
    director: String,
    actors:Array,
    description: String,
    duration: Number,
    writer:String,
    year:Number,
    date:Date
});

let Movie = module.exports = mongoose.model('Movie',movieSchema);
