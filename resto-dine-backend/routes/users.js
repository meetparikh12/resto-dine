const express = require('express');
const User = require('../models/User');
const ErrorHandling = require('../models/ErrorHandling');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {secretKey} = require('../config/key')
const {body, validationResult} = require('express-validator');

const route = express.Router()

route.post('/register', [
    body('name').trim().isLength({min: 4, max: 30}).withMessage('Name should be between 4 to 10 characters'),
    body('email').trim().isEmail().normalizeEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min: 6, max: 15}).withMessage('Password should be between 6 to 10 characters')
    ] , 
    async (req,res,next)=> {

    const error = validationResult(req);
    
    if(!error.isEmpty()){
        let err = {};
        err.message = error.array();
        err.status = 422;
        return next(err);
    }

    const {name, email, password, confirmPassword} = req.body;
    let isEmailAlreadyInUse;
    try {
        isEmailAlreadyInUse = await User.findOne({email})
    } catch(err){
        return next(new ErrorHandling('User not fetched, Please try again', 500))
    }
    if(isEmailAlreadyInUse){
        return next(new ErrorHandling('Email already in use', 422))
    }
    if (password !== confirmPassword) {
        return next(new ErrorHandling('Password does not match', 422));
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
    res.status(201).json({message: "Registered Successfully"})
    
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

    let token;
    try {
        token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                isAdmin: user.isAdmin,
                name: user.name
            }, 
            secretKey, 
            {
                expiresIn: '1h'
            }
        )
    } catch(err){
        return next(new ErrorHandling('Not Authorized', 401))
    }
    res.status(200).json({token});
})
module.exports = route;