const mongoose = require('mongoose')

const bookTableSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    email: {
        type: String,
        required: true
    }, 
    phone: {
        type: Number, 
        required: true
    }, 
    people: {
        type: Number, 
        required: true
    }, 
    date: {
        type: String, 
        required: true
    }, 
    time: {
        type: String,
        required: true
    }, 
    status: {
        type: String,
        default: 'Not Accepted'
    },
    bookingUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

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
    }],
    reservation: bookTableSchema
    
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema);