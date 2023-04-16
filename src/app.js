const express=require('express');
const path=require('path');
const hbs=require('hbs');
require("./db/conn");
const mongoose = require('mongoose');
const MongoClient= require('mongodb').MongoClient;
const {registerPartials} = require("hbs");
const { urlencoded } = require('body-parser');
const database = require('mime-db');
var session = require('express-session');
passport = require("passport")
bodyParser = require("body-parser")
LocalStrategy = require("passport-local")
passportLocalMongoose =require("passport-local-mongoose");
const Contact=require("./models/contactschema");
const ConsultQuery=require("./models/consultschema");
const User = require("./models/userschema");
var theuser;
var database1;

const viewspath=path.join(__dirname, '../templates/views');
const partialspath=path.join(__dirname, '../templates/partials');
const staticpath=path.join(__dirname, '../public');

const app=express();
const port= process.env.port || 4000;

app.use('/css',express.static(path.join(__dirname, "../node_modules/bootstrap/css")));
app.use('/js',express.static(path.join(__dirname, "../node_modules/bootstrap/js")));
app.use('/jq',express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use(express.urlencoded({extended:false}));
app.use(express.static(staticpath));
app.set("view engine", "hbs");
app.set("views", viewspath);
hbs.registerPartials(partialspath);

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

function Logged(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}
// function fillusername(req,res){
//     database1.collection('users').find({username:"Sumit"}).toArray((err,result)=>{
//         if(err) throw err
//         theuser = result[0].username;
//         res.send(result);
// })
// }
// fillusername();

app.get('/', (req, res)=>{
    res.render("index");
});
app.get('/index', (req, res)=>{
    res.render("index");
});
app.get('/consult',Logged, (req, res)=>{
    res.render("consult");
});
app.get('/team', Logged, (req,res)=>{
    res.render("team");
});
app.get('/register',(req,res)=>{
    res.render("register");
});
app.get('/login',(req,res)=>{
    res.render("login");
});
app.get('/MyServices',Logged, (req,res)=>{
    res.render("MyServices");
})
app.get("/logout", function (req, res) {
    req.logout(function(err){
        if(err) return err;
    })
    res.redirect("/");
});
app.get('/logindata', (req,res)=>{
    database1.collection('users').find({}).toArray((err,result)=>{
            if(err) throw err
            theuser = result[0].username;
            res.send(result);
    });
});

app.post("/login", passport.authenticate("local" , {
    successRedirect: "/index",
    failureRedirect: "/login"
}));

app.post('/contact', async(req,res)=>{
    try {
        const userData= new Contact(req.body);
        await userData.save();
        res.status(201).render("index");
    } catch (err) {
        console.log(err);
        res.status(500).send("err");
    }
});

app.post('/consult', async(req,res)=>{
    try {
        const data= new ConsultQuery(req.body);
        await data.save();
        res.status(201).render("consult");
    } catch (error) {
        console.log(error);
        res.status(500).send("error");
    }
});

app.post("/register", function (req, res) {
    var username = req.body.username
    var password = req.body.password
    User.register(new User({ username: username }),
            password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
 
        passport.authenticate("local")(
            req, res, function () {
            res.render("index");
        })
    })
});

app.listen(4000, ()=>{
    MongoClient.connect('mongodb://localhost:27017', (err,result)=>{
        if(err) throw err;
        database1= result.db('huh-db');
    })
    console.log(`server is listening on port ${port}`);    
});