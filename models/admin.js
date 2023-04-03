const mongoose = require('mongoose');

const path = require('path');

const multer = require('multer');

const avatarPath = ("/uploads/");

const avatarPathData = ("/multiuploads");

const crudschema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    contact : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    avatar :{
        type : String,
        required : true
    },
    sum :{
        type : String
    }
})

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, path.join(__dirname,'..',avatarPath));
    },
    filename : function(req,file,cb){
        cb(null, file.fieldname+'-'+Date.now())
    }
})

crudschema.statics.uploadedAvatar = multer({storage : storage}).fields([{name : 'avatar', maxCount : 1}, {
    name : "images", maxCount : 10
}]);

crudschema.statics.AVATAR_PATH = avatarPath;






const admin = mongoose.model('admin',crudschema);
module.exports = admin;