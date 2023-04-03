const mongoose = require('mongoose');

const path = require('path');

const multer = require('multer');

const avatarPathData = ("/multiuploads");

const ApiSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    hobby : {
        type : Array,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    image :{
        type : String,
        required : true
    }
})

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, path.join(__dirname,'..',avatarPathData));
    },
    filename : function(req,file,cb){
        cb(null, file.fieldname+'-'+Date.now())
    }
})

ApiSchema.statics.apiuploadedAvatar = multer({storage : storage}).single('profile');
ApiSchema.statics.AVATAR_PATH = avatarPathData;

const Apidata = mongoose.model('Apidata',ApiSchema);
module.exports = Apidata;