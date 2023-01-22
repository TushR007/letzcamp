const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const campground = require('./models/campgrounds');


mongoose.connect('mongodb://127.0.0.1:27017/letzcamp');

const db = mongoose.connection;
db.on("error",console.error.bind(console,"console error:"));
db.once("open",() => {
    console.log("Database Connected");
});

app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded({ extended:true }));
app.use(methodOverride('_method'));

app.get('/', (req,res) => {
    res.render("home");
});

app.get('/campgrounds', async(req,res) => {
    const allcamps = await campground.find({});
    res.render('campgrounds/index', { allcamps })
});

app.get('/campgrounds/:id/edit', async(req,res) => {
    const camp = await campground.findById(req.params.id);
    res.render('campgrounds/edit',{ camp });
})

app.get('/campgrounds/new', (req,res) => {
    res.render('campgrounds/new');
})

app.get('/campgrounds/:id', async(req,res) => {
    const camp = await campground.findById(req.params.id);
    res.render('show',{ camp })
});

app.post('/campgrounds', async(req,res) => {
    const camp = new campground(req.body.campground);
    await camp.save();
    res.redirect(`/campgrounds/${camp._id}`)
})

app.put('/campgrounds/:id',async(req,res) => {
    const { id } = req.params;
    await campground.findByIdAndUpdate(id,{...req.body.campground});
    res.redirect(`/campgrounds/${id}`);
})

app.delete('/campgrounds/:id',async(req,res) => {
    const { id } = req.params;
    await campground.findByIdAndDelete(id,{...req.body.campground});
    res.redirect(`/campgrounds`);
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})  