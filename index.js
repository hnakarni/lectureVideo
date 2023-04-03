const { urlencoded } = require('express');
const express = require('express');

const port = 8001;

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://rnwdevmansikakani:rnwMansikikani@cluster0.9j5egwl.mongodb.net/HomeCrud", {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log("db connected");
})
.catch((err)=>{
    console.log(err);
})

const app = express();

const path = require('path');

const multer = require('multer');

const upload = multer({
    dest : "./uploads/images"
})

const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');
const session = require('express-session');



app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(urlencoded({extended : false}));

app.post('/uploadImage', upload.single('profile'), (req,res)=>{
    console.log(req.body);
    console.log(req.file);
})

app.use(session({
    name : "RNW",
    secret : "CODEIAL",
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge :  1000*60*100
    }
}))

app.use(passport.initialize())
app.use(passport.session());

app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err)
    {
        console.log("This Port Is Not Running");
    }
    console.log("This Server Is Runnig On Port",port);
})