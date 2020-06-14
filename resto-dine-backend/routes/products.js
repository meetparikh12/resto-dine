const express = require('express')
const route = express.Router()
const ErrorHandling = require('../models/ErrorHandling');
const Product = require('../models/Product');
const ProductCategory = require('../models/ProductCategory');
const mongoose = require('mongoose');
const fileUpload = require('../middleware/file-upload');
const fs = require('fs')
const auth = require('../middleware/auth');
const User = require('../models/User');

route.post('/:categoryIdentifier', auth, fileUpload.single('image') ,async (req,res,next)=> {
    
    if(!req.user.isAdmin){
        return next(new ErrorHandling('Sorry, not Authorized', 401))
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

    let {categoryIdentifier} = req.params;
    categoryIdentifier = categoryIdentifier.toUpperCase()
    let foodCategory;
    try {
        foodCategory = await ProductCategory.findOne({categoryIdentifier})
    } catch(err){
        return next(new ErrorHandling('Product Category not fetched', 500))
    }
    if(!foodCategory) {
        return next(new ErrorHandling('Product Category not found', 404))
    }
    
    const {name, quantityInStock, price} = req.body;
    let imageURL = req.file.path;
    imageURL = imageURL.replace(/\\/g, "/")

    const product = new Product({
        name, image: imageURL, price, quantityInStock, category: foodCategory._id, creator: req.user.userId
    })
    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await product.save({session})
        await user.products.unshift(product);
        await user.save({session});
        await foodCategory.product.unshift(product)
        await foodCategory.save({session})
        await session.commitTransaction()
    } catch(err) {
        console.log(err);
        
        return next(new ErrorHandling('Food Product not created', 500))
    }

    res.status(201).json({product})
})

route.get('/', async (req,res,next)=> {
    let products;
    try {
        products = await Product.find()
    } catch(err) {
        return next(new ErrorHandling('Food Products not fetched', 500))
    }
    if(!products || products.length === 0){
        return next(new ErrorHandling('No Food Products found', 404))
    }
    res.status(200).json({products})
})

route.get('/:productId', async (req,res,next)=> {
    const {productId} = req.params;
    let product;
    try {
        product = await Product.findById(productId)
    }catch(err) {
        return next(new ErrorHandling('Invalid ID, Please try again', 500))
    }
    if(!product) {
        return next(new ErrorHandling('Food Product not found', 404))
    }
    res.status(200).json({foodProduct: product})
})

route.patch('/:productId', auth, async (req,res,next)=> {
    
    const {productId} = req.params;
    let product;
    try {
        product = await Product.findById(productId)
    }catch(err) {
        return next(new ErrorHandling('Invalid ID, Please try again', 500))
    }
    if(!product) {
        return next(new ErrorHandling('Food Product not found', 404))
    }
    if(!req.user.isAdmin || req.user.userId !== product.creator.toString()){
        return next(new ErrorHandling('Sorry, Not Authorized', 401))
    }
    const {name, quantityInStock, price} = req.body;
    product.name = name;
    product.quantityInStock = quantityInStock;
    product.price = price;
    try {
        await product.save();
    } catch(err) {
        return next(new ErrorHandling('Product not updated', 500))
    }

    res.status(200).json({product})
})

route.delete('/:productId', auth, async (req,res,next)=> {
    if(!req.user.isAdmin){
        return next(new ErrorHandling('Sorry, not Authorized', 401))
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

    const {productId} = req.params;
    let foodProduct;
    try {
        foodProduct = await Product.findById(productId).populate('category')
    }catch(err) {
        return next(new ErrorHandling('Invalid ID, Please try again', 500))
    }
    if(!foodProduct) {
        return next(new ErrorHandling('Food Product not found', 404))
    }

    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await user.products.pull(foodProduct);
        await user.save({session});
        await foodProduct.remove({session});
        removeImage(foodProduct.image);
        await foodProduct.category.product.pull(foodProduct);
        await foodProduct.category.save({session});
        await session.commitTransaction();
        
    }catch(err){
        return next(new ErrorHandling('Food Product not deleted', 500))
    }   

    res.status(200).json({message: 'Food Product deleted successfully'});

})

const removeImage = imagePath => {
    fs.unlink(imagePath, (err) => {
        err && console.log(err);
        !err && console.log("File deleted along with product");
    })
}

module.exports = route;