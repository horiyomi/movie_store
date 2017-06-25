const mongoose = require('mongoose');
// Creating schema and model
let schema = mongoose.Schema;
let userSchema = new schema({
    name: String,
    username: String,
    email: String,
    password:String
});

let User = module.exports = mongoose.model('User',userSchema);
