const ErrorHandling = require('../models/ErrorHandling')
const jwt = require('jsonwebtoken')
const {secretKey} = require('../config/key')

module.exports = async (req,res,next)=> {
    let header = req.get('Authorization');
    if(!header){
        return next(new ErrorHandling('Sorry, Not Authorized!', 401))
    }
    const token = header.split(" ")[1]
    let decoded_token;
    try {
        decoded_token = jwt.verify(token,secretKey)
    } catch(err){
        return next(new ErrorHandling('Token not verified', 500))
    }
    if(!decoded_token){
        return next(new ErrorHandling("Sorry, You're not Authorized", 401))
    }
    req.user = decoded_token
    next()
}