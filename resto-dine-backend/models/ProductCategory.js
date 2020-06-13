const mongoose = require('mongoose')

const productCategorySchema = new mongoose.Schema({
    menuImage: {
        type: String,
        required: true
    }, 
    categoryIdentifier: {
        type: String,
        required: true,
        unique: true
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }]
})

module.exports = mongoose.model('ProductCategory', productCategorySchema);