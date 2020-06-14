const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    quantityInStock: {type: Number, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory', required: true},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    isSpeciality: {type: Boolean, required: true, default: false}
})

module.exports = mongoose.model('Product', productSchema);