const mongoose = require('mongoose');

const Order = require('./../models/order');
const Product = require('./../models/product');

// create a new order
exports.createNewOrder = async (req, res, next) => {

    try {
        let productId = await Product.findById(req.body.productId);

        if (!productId) {
            return res.status(404).json({
                status: "error",
                message: 'Product Not Found due to Invalid ID',
            });
        }

        const order = new Order ({ // create a new order using the Order model as a constructor
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        });

        let createdOrder = await order.save();

        res.status(201).json({
            status: "success",
            createdOrder: {
                _id: createdOrder._id,
                product: createdOrder.product,
                quantity: createdOrder.quantity,
                request: {
                    type: 'GET',
                    url: `http://localhost:${process.env.PORT}/orders/${createdOrder._id}`
                }
            }
        });

    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: "error",
            err: err.message
        });
    }
}

// get all orders
exports.getAllOrders = async (req, res, next) => {
    try {
        let orders = await Order.find({}).populate('product', 'name price').select('_id product quantity');

        if (!orders ) {
            return res.status(404).json({
                status: "error",
                message: "No Orders Found",
            });
        }

        res.status(200).json({
            status: 'success',
            count: orders.length,
            orders: orders.map((order) => {
                return {
                    _id: order._id,
                    product: order.product,
                    quantity: order.quantity,
                    request: {
                        type: 'GET',
                        url: `http://localhost:${process.env.PORT}/orders/${order._id}`
                    }
                }
            }),
        });

    } catch (err) {
        res.status(404).json({
            status: "error",
            err
        });
    }
}

// get an order
exports.getOrder = async (req, res, next) => {

    try {
        const orderId = req.params.orderId;
        let order = await Order.findById(orderId).populate('product', 'name price').select('_id product quantity');

        if (!order) {
            return res.status(404).json({
                status: "error",
                message: "No valid order found for provided ID",
            });
        }

        res.status(200).json({
            status: "success",
            order: {
                _id: order.id,
                product: order.product,
                quantity: order.quantity,
                request: {
                    type: 'GET',
                    description: 'Get All Orders',
                    url: `http://localhost:${process.env.PORT}/orders`
                }
            }
        });

    } catch (err) {
        res.status(404).json({
            status: "error",
            err
        });
    }
}

// update an order
exports.updateOrder = (req, res, next) => {
    const id = req.params.orderId;
    res.status(200).json({
        message: 'Updated order!'
    });
}

// delete an order
exports.deleteOrder = async (req, res, next) => {
    const orderId = req.params.orderId;

    try {
        let deletedOrder = await Order.findByIdAndRemove({_id: orderId});

        if (!deletedOrder) {
            return res.status(404).json({
                status: "error",
                message: "No valid order found for provided ID",
            });
        }

        res.status(200).json({
            status: 'success',
            deletedOrder: {
                _id: deletedOrder._id,
                product: deletedOrder.product,
                quantity: deletedOrder.quantity,
            },
            request: {
                type: 'POST',
                url: `http://localhost:${process.env.PORT}/orders/`,
                body: {
                    productId: 'ID',
                    quantity: 'Number'
                }
            }
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            err: err.message
        });
    }
};
