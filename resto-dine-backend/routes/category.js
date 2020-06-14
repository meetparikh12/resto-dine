const express = require('express')
const route = express.Router()
const ErrorHandling = require('../models/ErrorHandling');
const ProductCategory = require('../models/ProductCategory');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const fileUpload = require('../middleware/file-upload');
const fs = require('fs')
const auth = require('../middleware/auth');
const User = require('../models/User');

route.post('/', auth, fileUpload.single('image') ,async (req,res,next)=> {
    if (!req.user.isAdmin) {
        return next(new ErrorHandling('Sorry, Not Authorized!!', 401))
    }
    let user; 
    try {
        user = await User.findOne({email : req.user.email})
    } catch(err){
        return next(new ErrorHandling('User not fetched', 500))
    }
    if(!user){
        return next(new ErrorHandling('User not found', 404))
    }
    
    let {categoryIdentifier} = req.body;
    categoryIdentifier = categoryIdentifier.toUpperCase();
    
    let isCategoryAlreadyInUse;
    
    try {
        isCategoryAlreadyInUse = await ProductCategory.findOne({categoryIdentifier})
    }catch(err){
        return next(new ErrorHandling('Sorry, Please Try again', 500))
    }
    if(isCategoryAlreadyInUse){
        return next(new ErrorHandling('Category already in use', 422))
    }
    
    let imageURL = req.file.path;
    imageURL = imageURL.replace(/\\/g, "/")

    const foodCategory = new ProductCategory({
        menuImage: imageURL, categoryIdentifier, creator: req.user.userId
    })
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await foodCategory.save({session});
        await user.category.unshift(foodCategory);
        await user.save({session});
        await session.commitTransaction();

    } catch(err) {
        return next(new ErrorHandling('Food Category not created', 500))
    }
    res.status(201).json({foodCategory})
})

route.get('/', async (req,res,next)=> {
    let categories;
    try {
        categories = await ProductCategory.find().select('-product')
    } catch(err){
        return next(new ErrorHandling('Food Categories not fetched', 500))
    }
    if(categories.length === 0){
        return next(new ErrorHandling('No food categories found', 404))
    }

    res.status(200).json({categories});

})

route.get('/:categoryIdentifier', async (req,res,next)=> {
    
    let {categoryIdentifier} = req.params;
    categoryIdentifier = categoryIdentifier.toUpperCase()
    let foodCategory;
    try {
        foodCategory = await ProductCategory.find({categoryIdentifier}).populate('product')
    } catch(err){
        return next(new ErrorHandling('Food Category not fetched', 500))
    }
    if(!foodCategory || foodCategory.length === 0) {
        return next(new ErrorHandling('Food Category not found', 404))
    }
    res.status(200).json({foodProducts: foodCategory})

})

route.delete('/:categoryIdentifier', auth, async (req,res,next)=> {
    if(!req.user.isAdmin) {
        return next(new ErrorHandling('Sorry, Not Authorized!!', 401))
    }
    try{
        user = await User.findOne({
            email: req.user.email
        })
    } catch (err) {
        return next(new ErrorHandling('User not fetched', 500))
    }
    if(!user) {
        return next(new ErrorHandling('User not found', 404))
    }


    let {categoryIdentifier} = req.params;
    categoryIdentifier = categoryIdentifier.toUpperCase();
    let foodCategory;
    try {
        foodCategory = await ProductCategory.findOne({categoryIdentifier}).populate('product')
    }catch(err){
        return next(new ErrorHandling('Food Category not fetched', 500))
    }
    if(!foodCategory){
        return next(new ErrorHandling('Food Category not found', 404))
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await foodCategory.remove({session});
        await foodCategory.product.map((product)=> product.remove({session}));
        await user.category.pull(foodCategory);
        await user.products.splice(0, user.products.length);
        await user.save({session});
        await session.commitTransaction();
        
    }catch(err){
        return next(new ErrorHandling('Food Category not deleted', 500))
    }
    removeImage(foodCategory.menuImage);
    res.status(200).json({message: 'Food category and all its product deleted successfully'})
})

const removeImage = imagePath => {
    fs.unlink(imagePath, (err) => {
        err && console.log(err);
        !err && console.log("File deleted along with product");
    })
}

module.exports = route;