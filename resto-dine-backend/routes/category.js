const express = require('express')
const route = express.Router()
const ErrorHandling = require('../models/ErrorHandling');
const ProductCategory = require('../models/ProductCategory');

route.post('/', async (req,res,next)=> {
    const {image, categoryIdentifier} = req.body;
    const category = new ProductCategory({
        menuImage: image, categoryIdentifier: categoryIdentifier.toUpperCase()
    })
    try {
        await category.save()
    } catch(err) {
        return next(new ErrorHandling('Product Category not created', 500))
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
        return next(new ErrorHandling('Product Category not fetched', 500))
    }
    if(!foodCategory || foodCategory.length === 0) {
        return next(new ErrorHandling('Product Category not found', 404))
    }
    res.status(200).json({foodCategory})

})

module.exports = route;