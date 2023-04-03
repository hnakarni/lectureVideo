const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/crudwork');

const db = mongoose.connection;

const path = require('path');

db.on('error', console.error.bind('error',console));

db.once('open', function(err){
    if(err)
    {
        console.log("Mongoose Is Not Connected !!");
    }
    console.log("Mongoose Is Connected");
})

module.exports = db;