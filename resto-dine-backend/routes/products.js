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
module.exports = route;