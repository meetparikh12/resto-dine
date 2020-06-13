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

module.exports = route;