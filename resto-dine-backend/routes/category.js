const express = require('express')
const route = express.Router()
const ErrorHandling = require('../models/ErrorHandling');
const ProductCategory = require('../models/ProductCategory');
const Product = require('../models/Product');
const mongoose = require('mongoose')

route.post('/', async (req,res,next)=> {
    const {image, categoryIdentifier} = req.body;
    const category = new ProductCategory({
        menuImage: image, categoryIdentifier: categoryIdentifier.toUpperCase()
    })
    try {
        await category.save()
    } catch(err) {
        return next(new ErrorHandling('Food Category not created', 500))
    }
    res.status(201).json({category})
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
    res.status(200).json({foodCategory})

})

route.delete('/:categoryIdentifier', async (req,res,next)=> {
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
        await session.commitTransaction();
    }catch(err){
        return next(new ErrorHandling('Food Category not deleted', 500))
    }
    res.status(200).json({message: 'Food category and all its product deleted successfully'})
})
module.exports = route;