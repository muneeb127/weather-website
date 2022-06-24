const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { query } = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define path for express configs
const viewPath = path.join(__dirname, '../templates/views');
const publicDirectoryPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');


//Telling express which template engine we installed
//Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res)=>{
    //Sending values to the index.hbs view for dynamic rendering
    res.render('index', {
        title: 'Weather App',
        name: 'Muneeb'
    });
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Page',
        name: 'Muneeb'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page',
        message: 'You will make it.',
        name: 'Muneeb'
    })
})

//This will send a JSON object for rendering
app.get('/weather', (req, res)=>{

    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    else{
        geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
            if(error){
                return res.send({
                    error
                });
            }

            forecast(latitude, longitude, (error, forecastData)=>{
                if(error){
                    return res.send({
                        error
                    });
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                });
            })
        })
    }

    // res.send({
    //     location: 'Karachi',
    //     forecast: 'It is very hot today',
    //     address: req.query.address
    // });
})

app.get('/help/*', (req, res)=> {
    res.render('404pagehelp', {
        title: 'Help article not found',
        name: 'Muneeb'
    });
    //res.send('My 404 Page');
})

app.get('*', (req, res)=> {
    res.render('404page', {
        title: 'Page not found',
        name: 'Muneeb'
    });
    //res.send('My 404 Page');
})

app.listen(port, ()=>{
    console.log('The app is running on port ' + port);
})