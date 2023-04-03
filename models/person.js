const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    index : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    isActive : {
        type : Boolean,
        required : true
    },
    age :{
        type : Number,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    eyeColor : {
        type : Boolean,
        required : true
    },
    favoriteFruit :{
        type : Number,
        required : true
    },
    company : {
        type : Object,
        required : true
    },
    tags : {
        type : Array,
        required : true
    }
})

const person = mongoose.model('person',personSchema);
module.exports = person;