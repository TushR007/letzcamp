const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const campground = require('./models/campgrounds');


mongoose.connect('mongodb://127.0.0.1:27017/letzcamp');

const db = mongoose.connection;
db.on("error",console.error.bind(console,"console error:"));
db.once("open",() => {
    console.log("Database Connected");
});


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.get('/', (req,res) => {
    res.render("home");
})

app.get('/campgrounds', async(req,res) => {
    const allcamps = await campground.find({});
    res.render('campgrounds/index', { allcamps })
})

app.get('/campgrounds/:id', async(req,res) => {
    res.render()
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})  