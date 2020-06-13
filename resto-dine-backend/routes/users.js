const express = require('express');
const User = require('../models/User');
const ErrorHandling = require('../models/ErrorHandling');
const bcrypt = require('bcryptjs')

const route = express.Router()

route.post('/register', async (req,res,next)=> {
    const {name, email, password} = req.body;
    let isEmailAlreadyInUse;
    try {
        isEmailAlreadyInUse = await User.findOne({email})
    } catch(err){
        return next(new ErrorHandling('User not fetched, Please try again', 500))
    }
    if(isEmailAlreadyInUse){
        return next(new ErrorHandling('Email already in use', 422))
    }
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12)
    } catch(err){
        return next(new ErrorHandling('Password not hashed', 500))
    }
    const user = new User({
        name, email, password: hashedPassword
    })
    try {
        await user.save();
    }catch(err){
        return next(new ErrorHandling('User not registered', 500))
    }
    res.status(201).json({user})
    
})

route.post('/login', async (req,res,next)=> {
    const {email, password} = req.body;
    let user;
    try {
        user = await User.findOne({email});
    } catch(err){
        return next(new ErrorHandling('User not fetched, try again', 500))
    }
    if(!user){
        return next(new ErrorHandling('Invalid Credentials', 403))
    }
    let isPasswordEqual;
    try {
        isPasswordEqual = await bcrypt.compare(password, user.password)
    } catch(err){
        return next(new ErrorHandling('Password not compared', 500))
    }
    if(!isPasswordEqual){
        return next(new ErrorHandling('Invalid Credentials', 403))
    }
    res.status(200).json({user});
})
module.exports = route;