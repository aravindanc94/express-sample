var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var Fbstrategy = require('passport-facebook').Strategy;
var pug = require('pug');
var app = express();
var path = require('path');
var cors = require('cors');

passport.use(new Fbstrategy({
    clientID: "370879730046851",
    clientSecret: "773fb238ce12cc767055016136d38860",
    callbackURL: 'http://localhost:2300/loggedIn',
    profileFields: ["id", "birthday", "email", "first_name", "gender", "last_name"],
    enableProof: true
},function(accessToken, refreshToken, profile, cb){
    return cb(profile);
    console.log(JSON.stringify(profile));
}));

app.use(cors()); 
app.use('/assets', express.static(path.join(__dirname,'/assets')));
app.use(cookieParser());
app.use(session({
    secret: "The Quiet Fox",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine','pug');

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

app.get('/',function(req,res){
    res.render('index')
})

app.get('/failedLogin',function(req,res){
    res.send('Failed to login!');
})

app.get('/deauthorized',function(req,res){
    res.send('App deauthorized!');
});

app.get('/login/facebook', passport.authenticate('facebook', {
    successRedirect: '/loggedIn',
    failureRedirect: '/failedLogin'
    }),function(req,res,next){});

app.get('/loggedInFb',function(req,res){
    if(req.session.fb_session){
        res.send("Hurray! logged in using facebook session!"+req.user);
    }
});

app.get('/loggedIn',function (req,res) {
    if(req.session.fb_session) { res.redirect('/loggedInFb'); } 
    else {
        req.session.fb_session = true; 
        res.send('Logged in from facebook!');
    };
});

app.listen(2300,function(){
    console.log('Started server!');
    
})