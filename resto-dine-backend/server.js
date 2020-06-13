const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const ErrorHandling = require('./models/ErrorHandling')
const productRoute = require('./routes/products')
const categoryRoute = require('./routes/category')
const userRoute = require('./routes/users')
const mongoose = require('mongoose')
const {mongoURI} = require('./config/key')
const fs = require('fs')

const port = process.env.PORT || 5000

app.use(bodyParser.json())

app.use((req,res,next)=> {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Methods", 'OPTIONS, GET, POST, PUT, DELETE, PATCH');
    res.setHeader("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Accept, Content-Type, Authorization');
    next()
})

app.use('/api/category', categoryRoute)
app.use('/api/product', productRoute)
app.use('/api/users', userRoute)

app.use((req,res,next)=>{
    return next(new ErrorHandling('Specified route does not exist', 404))
})

app.use((error,req,res,next)=>{
    if(req.file){
        fs.unlink(req.file.path, (err)=> {
            err && console.log(err);
            !err && console.log("File deleted");
        })
    }
    const message = error.message || 'Unknown error occured'
    const status = error.status || 500
    res.status(status).json({message})
})

mongoose.connect(mongoURI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(()=> {
    app.listen(port, () => {
        console.log("Server started on port: " + port)
    })
})
.catch((err) => {
    console.log(err)
})
