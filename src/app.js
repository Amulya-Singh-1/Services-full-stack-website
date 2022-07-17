const express=require('express');
const path=require('path');
const hbs=require('hbs');
const User=require("./models/userschema");
const ConsultQuery=require("./models/consultschema");
const NewAccount=require("./models/accountschema");
require("./db/conn");
const {registerPartials} = require("hbs");
const { urlencoded } = require('body-parser');

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

app.get('/', (req, res)=>{
    res.render("index");
})
app.get('/index', (req, res)=>{
    res.render("index");
})
app.get('/consult', (req, res)=>{
    res.render("consult");
})
app.get('/team',(req,res)=>{
    res.render("team");
})
app.get('/register',(req,res)=>{
    res.render("register");
})
app.get('/login',(req,res)=>{
    res.render("login");
})

app.post('/contact', async(req,res)=>{
    try {
        const userData= new User(req.body);
        await userData.save();
        res.status(201).render("index");
    } catch (err) {
        console.log(err);
        res.status(500).send("err");
    }
})
app.post('/consult', async(req,res)=>{
    try {
        const data= new ConsultQuery(req.body);
        await data.save();
        res.status(201).render("consult");
    } catch (error) {
        console.log(error);
        res.status(500).send("error");
    }
})
app.post('/register',async(req,res)=>{
    try {
        const accdata = new NewAccount(req.body);
        await accdata.save();
        res.status(201).render("login");
    } catch (error) {
        console.log(error);
        res.status(500).send("error");
    }
})

app.listen(4000, ()=>{
    console.log(`server is listening on port ${port}`);
});