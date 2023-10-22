const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');


const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

let newItems = []


app.get('/', (req,res)=>{
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let today = new Date();
    let day = today.toLocaleDateString("en-US", options);
    res.render('index', {kindOfDay:day , newListItem: newItems});
});

app.post("/",(req,res)=>{
    let newItem = req.body.newItem;
    newItems.push(newItem);
    res.redirect('/');
});

app.get("/work",(req,res)=>{
    res.render("work",{ newListItem: newItems});
});

app.post("/work",(req,res)=>{
    let newItem = req.body.newItem;
    newItems.push(newItem);
    res.send(newItem);
});

app.listen(3000, ()=>{
    console.log('port is running on 3000');
});
