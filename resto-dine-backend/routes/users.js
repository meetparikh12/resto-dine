const express = require('express');
const User = require('../models/User');
const ErrorHandling = require('../models/ErrorHandling');
const route = express.Router()
const bcrypt = require('bcryptjs')

route.post('/register', async (req,res,next)=> {
    const {name, email, password} = req.body;
    let isEmailAlreadyInUse;
    try {
        isEmailAlreadyInUse = User.findOne({email})
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
    res.status(201).json({message: 'Registered successfully'})
    
})