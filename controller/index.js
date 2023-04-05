// const admin = require('../models/admin');
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');

const path = require('path');

module.exports.register = (req,res) =>{
    return res.render('registre');
}


module.exports.checkLogin = (req,res) =>{
    return res.render('login');
}

module.exports.checkLoginData = async (req,res)=>{
    // console.log(req.body);
    let data = await Admin.findOne({contact:req.body.contact});
    if(!data && data.password != req.body.password){
        // console.log(data)
        return res.json({'status':200,'msg':"User or password not match"})
    }
    else{
        let token = jwt.sign(data.toJSON(),'RNW',{expiresIn : '100000'})
        return res.json({'status':200, 'msg': "Sign in Successfully",'token_': token});
    }
}


module.exports.insertdata = (req,res) =>{
    // console.log(req.files.avatar);

    // console.log(req.files.images);
    
    let avatarP = Admin.AVATAR_PATH+"/"+req.file.filename;
    Admin.create({
        name : req.body.name,
        contact : req.body.contact,
        password : req.body.password,
        avatar : avatarP
    }).then((response)=>{
        return res.redirect('/');
    }).catch((err)=>{
        console.log("something wrong!! Query is not working")
        console.log(err);
    })
}


module.exports.view_record = async (req,res) =>{
    var  search  = '';

    if(req.query.search){
        search = req.query.search;
    }

    var page = 1;
    if(req.query.page){
        page = req.query.page
    }

    var limit = 2;

    var data = await  Admin.find({
        $or :[
        {name : { $regex : '.*'+search+'.*'}}
        ]
    })
    .skip((page -1) * limit)
    .limit(limit*1)
    .exec();

    var countdata = await  Admin.find({
        $or :[
        {name : { $regex : '.*'+search+'.*'}}
        ]
    }).countDocuments();

    return res.render('view',{
        record: data,
        totalPages : Math.ceil(countdata/limit),
        currentPage : page,
        searching : search
    })
}


module.exports.view_custom_record = async (req,res) =>{

    var search = "";
    if(req.query.search){
        search = req.query.search;
    }
   
    var page = 1;
    if(req.query.page){
        page = req.query.page;
    }

    var per_page = 2;

    var data = await Admin.find({
        $or : [
            {name : { $regex : '.*'+search+'.*'}}
        ]
    })
    .skip((page -1)*per_page)
    .limit(per_page*1)
    .exec();

    var countdata = await Admin.find({
        $or : [
            {name : { $regex : '.*'+search+'.*'}}
        ]
    }).countDocuments();

    return res.render('view_custom',{
        record : data,
        countrecord : Math.ceil(countdata/per_page),
        searchData : search
    })
}


module.exports.loginDataLogin =function(req,res){
    return res.json({'status':200})
}