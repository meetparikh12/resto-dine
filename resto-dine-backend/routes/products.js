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
        console.log(foodCategory);
    } catch(err){
        console.log(err);
        
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

module.exports = route;