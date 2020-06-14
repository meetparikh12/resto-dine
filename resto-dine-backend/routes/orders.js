const express = require('express');
const route = express.Router();
const orderController = require('../controllers/orders');
const auth = require('../middleware/auth');

route.post('/', auth, orderController.CREATE_ORDER);
route.patch('/:orderId/pay', auth, orderController.MODIFY_ORDER);
route.get('/:orderId', auth, orderController.GET_ORDER);
route.get('/user/:userId', auth, orderController.GET_ALL_ORDERS);
module.exports = route;