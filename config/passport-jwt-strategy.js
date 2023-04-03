const passport = require('passport');

const jwtStrategy = require('passport-jwt').Strategy;

const ExtractJWT = require('passport-jwt').ExtractJwt;

const opt = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : "RNW"
}

const Admin = require('../models/admin');

passport.use(new jwtStrategy(opt, async function(jwtPayload, done){

    console.log("hi");
   

    let user = await Admin.findById(jwtPayload._id);

    if(user){
        console.log("middleware")
        console.log(user);
        return done(null,user)
    }
    else{
        return done(null,false)
    }
}))


passport.serializeUser(function(user,done){
    return done(user.id)
})

passport.deserializeUser(function(id,done){
    Admin.findById(id, function(err,user){
        if(err){
            return done(null,err)
        }
        return done(null,user)
    })
})

module.exports = passport;