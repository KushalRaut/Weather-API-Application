const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Kushal Raut'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Kushal Raut'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Kushal Raut'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'Please provide a valid address'
        })
    }
    geocode(req.query.address,(error,{lat,lon}={})=>{
        console.log(error)
        if(error)
          return res.send({error})
      
        forecast(lat, lon, (error, forecastData) => {
          
            if(error)
                return res.send(error)
      
            res.send({ 
                forecast: forecastData,
            })
        })
    })
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'please provide a valid search'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})


app.get('*',(req,res)=>{
    res.render('404page',{title:'404 error'})
})


app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})