const express = require('express');

const route = express.Router();

const controller = require('../controller/index');

const Admin  = require('../models/admin');

const Apimodel = require('../models/apiImage');

const ApiImage = require('../controller/apiImageController');

const passport  = require('passport');

route.get('/', controller.register);

route.post('/apiLoginData', ApiImage.apiLoginData);

route.post('/insertdata', Admin.uploadedAvatar, controller.insertdata);

route.post('/imageUploading', Apimodel.apiuploadedAvatar, ApiImage.apiImage);

route.delete('/deleteApiRecord/:id', ApiImage.deleteApiRecord);

route.put('/updateApiRecord/:id', Apimodel.apiuploadedAvatar, ApiImage.updateApiRecod)

route.get("/view_record", controller.view_record);

route.get('/view_record_custom', controller.view_custom_record);

route.get('/login', controller.checkLogin);

route.post('/checkLoginData', controller.checkLoginData);

// route.get('/viewApiData', passport.authenticate('jwt',{session : false}), ApiImage.viewApiData);


route.get('/Wronglogin', async (req,res)=>{
    return res.json({status:200,'msg':"Invalid Token"})
})


//aggregation:
route.get('/viewApiData',  ApiImage.viewApiData);

route.get('/sortingData', ApiImage.sortingData);

route.get('/groupingData', ApiImage.groupingData);

route.get('/matchData',  ApiImage.matchData);

module.exports = route;