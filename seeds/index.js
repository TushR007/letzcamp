const mongoose = require('mongoose');
const campground = require('../models/campgrounds');
const { places,descriptors } = require('./seedHelpers')
const cities = require('./cities')


mongoose.connect('mongodb://127.0.0.1:27017/letzcamp');

const db = mongoose.connection;
db.on("error",console.error.bind(console,"console error:"));
db.once("open",() => {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async() => {
    await campground.deleteMany({});
    for(let i = 0;i<50;i++){
        const rand = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random() * 30) + 10;

        const camps = new campground({
            location:`${cities[rand].city},${cities[rand].state}`,
            title: `${sample(descriptors)} , ${sample(places)}`,
            image:`https://source.unsplash.com/random/300x300?camping,${i}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa dignissimos tempore iure qui voluptas cupiditate laudantium! Delectus, officiis id eius architecto velit expedita eaque quidem veniam, inventore itaque soluta atque.',
            price
        })

        await camps.save();
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close();
    })