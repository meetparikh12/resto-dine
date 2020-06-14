const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },  
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }], 
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCategory',
        required: true
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    }]
    
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema);