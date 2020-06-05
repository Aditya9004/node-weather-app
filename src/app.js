const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000
const app = express()

// Set up path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req,res) => {
    res.render('index',{
        title : 'Weather',
        name : 'Aditya'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title : 'About',
        name : 'Aditya'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help',
        name : 'Aditya',
        helpText : 'This is something where you need help'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address) {
        return res.send({
            error : 'Please provide address'
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location} = {}) => {
        if(error) {
            return res.send({
                error : error
            })
        }
        forecast(latitude,longitude,(error,forecastData) => {
            if(error) {
                return res.send({
                    error : error
                })
            }

             res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })


        })

    })
})

app.get('/products',(req,res) =>{

    if(!req.query.search) {
        return res.send({
            error : 'Please provide search string'
        })
    }
    console.log(req.query)
    res.send({
        products : []
    })
})

app.get('/help/*', (req,res) =>{
    res.render('404',{
        'title' : '404',
        'error' : 'Help Article Not Found',
        'name' : 'Aditya'
    })
})

app.get('*', (req,res) =>{
    res.render('404',{
        'title' : '404',
        'error' : 'Page Not Found',
        'name' : 'Aditya'
    })
})

app.listen(port, ()=> {
    console.log('Server is up and running')
})