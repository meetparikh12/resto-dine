const express = require('express')
const route = express.Router()
const ErrorHandling = require('../models/ErrorHandling');
const Product = require('../models/Product');
const ProductCategory = require('../models/ProductCategory');
const mongoose = require('mongoose')

route.post('/:categoryIdentifier', async (req,res,next)=> {
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

    const {name, image, quantityInStock, price} = req.body;
    const product = new Product({
        name, image, price, quantityInStock
    })
    try {
        const session = await mongoose.startSession()
        session.startTransaction()
         await product.save()
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

route.patch('/:productId', async (req,res,next)=> {
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
module.exports = route;