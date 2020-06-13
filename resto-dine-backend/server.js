const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const ErrorHandling = require('./models/ErrorHandling')

const port = process.env.PORT || 5000

app.use(bodyParser.json())

app.use((req,res,next)=> {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Methods", 'OPTIONS, GET, POST, PUT, DELETE, PATCH');
    res.setHeader("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Accept, Content-Type, Authorization');
    next()
})

app.use((req,res,next)=>{
    return next(new ErrorHandling('Specified route does not exist', 404))
})

app.use((error,req,res,next)=>{
    res.status(error.status).json({message: error.message})
})

app.listen(port, ()=> {
    console.log("Server started on port: " +port);
})