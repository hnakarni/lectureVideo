const ApiAdmin = require('../models/apiImage');
const Admin  = require('../models/admin');

const fs = require('fs');
const path = require('path')



const jwt = require('jsonwebtoken');



module.exports.apiImage = async function(req,res){
    var imagePath = ApiAdmin.AVATAR_PATH+"/"+req.file.filename;
    req.body.image = imagePath;

    // console.log(req.body);
    let data = await ApiAdmin.create(req.body);
    if(data){
        return res.json({'status':200,'msg':"Record inserted successfully",'record':data});
    }
    else{
        return res.json({'status':200, 'msg':"Something wrong"});
    }
}


module.exports.deleteApiRecord = async function(req,res){
    // console.log(req.params.id);
    let record = await ApiAdmin.findByIdAndDelete(req.params.id);
    if(record){
        return res.json({'status':200, 'msg': "Record deleted successfully"})
    }
    else{
        return res.json({'status':200,'msg':"something wrong"});
    }

}


module.exports.updateApiRecod = async function(req,res){
    
    let oldApi = await ApiAdmin.findById(req.params.id);
    if(oldApi){
        await fs.unlinkSync(path.join(__dirname,'..',oldApi.image));
        if(req.file){
            req.body.image = ApiAdmin.AVATAR_PATH+"/"+req.file.filename;
            let udata = await ApiAdmin.findByIdAndUpdate(req.params.id,req.body);
            if(udata){
                return res.json({'status':200,'msg':"record updated successfully"})
            }
            else{
                return res.json({'status':200,'msg':"Something wrong"});
            }
        }
        else{
            return res.json({'status':200,'msg':"File not uploading"});
        }
    }
    else{
        return res.json({'status':200,'msg':"Record not found"});
    }
}

module.exports.apiLoginData = async function(req,res){
    // return res.json({'status':200, data:req.body});

    let adminData = await Admin.findOne({contact:req.body.contact});
    console.log(adminData);
    if(!adminData || adminData.password !== req.body.password){
        return res.json({status:400,'msg':"record not found"});
    }
    else{
        let token = await jwt.sign(adminData.toJSON(), 'RNW', {expiresIn : '100000'});

        return res.json({'status': 200, 'token': token,'msg':"Token is generated successfully"})
    }
}


module.exports.viewApiData = async (req,res) =>{
   
    let AdminData = await Admin.aggregate([
        {$sort:{index: 1}},
    ]);
   return res.json({status:200, data: AdminData});
}


module.exports.sortingData = async (req,res) =>{
    let sortingData  = await Admin.aggregate([
        {$sort : {eyeColor : 1}}
    ])

    return res.json({status: 200, data : sortingData});
}

module.exports.groupingData = async (req,res) =>{
    let sortingData  = await Admin.aggregate([
        {$group : { _id : "$company.location.country"}}
    ])

    return res.json({status: 200, data : sortingData});
}


module.exports.matchData = async (req,res) =>{
    let MatchingData = await Admin.aggregate([
        { $match : { gender : "female", tags : {$size : 3}}}
    ])
    return res.json({status: 200, data : MatchingData});
}