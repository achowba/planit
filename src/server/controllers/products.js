const mongoose = require('mongoose');

const Product = require('./../models/product'); // import model
const { deleteProductImage } = require('./../utils/helpers');

// get all products
exports.getAllProducts = async (req, res, next) => {
    try {
        let products = await Product.find().select('name price _id productImage');

        if (!products) {
            return res.status(404).json({
                status: "error",
                message: "No products found",
            });
        }

        const response = {
            status: "success",
            count: products.length,
            products: products.map((product) => {
                return {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    productImage: product.productImage,
                    imageUrl: `http://localhost:${process.env.PORT}/${product.productImage}`,
                    request: {
                        type: 'GET',
                        url: `http://localhost:${process.env.PORT}/products/${product._id}`,
                    }
                }
            })
        }

        res.status(200).json(response);

    } catch (err) {
        res.status(500).json({
            err: err.message
        });
    }
}

// post a new product
exports.createProduct = async (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });

    try {
        let createdProduct = await product.save(); // store the data from the post request in the database

        res.status(201).json({
            status: "success",
            createdProduct: {
                _id: createdProduct._id,
                name: createdProduct.name,
                price: createdProduct.price,
                productImage: product.productImage,
                imageUrl: `http://localhost:${process.env.PORT}/${createdProduct.productImage}`,
                request: {
                    type: 'GET',
                    url: `http://localhost:${process.env.PORT}/products/${createdProduct._id}`,
                }
            }
        });

    } catch (err) {
        res.status(400).json({
            status: "error",
            err: err.message
        });
    }
}

// get a single product
exports.getProduct = async (req, res, next) => {
    const id = req.params.productId;

    try {
        let product = await Product.findById(id).select('name price _id productImage');

        if (!product) {
            return res.status(404).json({
                status: "error",
                message: "No valid entry found for provided ID",
            });
        }

        res.status(200).json({
            status: "success",
            product:{
                _id: product._id,
                name: product.name,
                price: product.price,
                productImage: product.productImage,
                imageUrl: `http://localhost:${process.env.PORT}/${product.productImage}`,
                request: {
                    type: 'GET',
                    description: 'Get All Products',
                    url: `http://localhost:${process.env.PORT}/products`,
                }
            }
        });

    } catch (err) {
        res.status(500).send({
            status: "error",
            err: err.message
        });
    }
}

// update a product
exports.updateProduct = async (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};

    for (const ops of req.body) {
        console.log(ops);
        updateOps[ops.propName.toString()] = ops.value;
    }

    try {
        let updatedProduct = await Product.findByIdAndUpdate(
            {
                _id: id
            }, {
                $set: updateOps
            }
        );

        res.status(200).json({
            status: "success",
            updatedProduct: {
                _id: updatedProduct._id,
                name: updatedProduct.name,
                price: updatedProduct.price,
                productImage: `http://localhost:${process.env.PORT}/${updatedProduct.productImage}`,
                request: {
                    type: 'GET',
                    url: `http://localhost:${process.env.PORT}/products/${updatedProduct._id}`,
                }
            }
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            err: err.message
        });
    }
}

// delete a product
exports.deleteProduct = async (req, res, next) => {
    let id = '';
    if (req.body.productId) {
        id = req.body.productId;
    } else {
        id = req.params.productId;
    }

    try {
        let deletedProduct = await Product.findByIdAndDelete({_id: id});

        if (!deletedProduct) {
            return res.status(404).json({
                status: "error",
                message: "No valid entry found for provided ID",
            });
        }

        deleteProductImage(deletedProduct.productImage); // delete the product image from the folder
        res.status(200).json({
            status: "success",
            deletedProduct: {
                _id: deletedProduct._id,
                name: deletedProduct.name,
                price: deletedProduct.price,
                imageUrl: `http://localhost:${process.env.PORT}/${deletedProduct.productImage}`,
            },
            request: {
                type: 'POST',
                description: 'Add a New Product',
                url: `http://localhost:${process.env.PORT}/products/`,
                body: {
                    name: 'String',
                    price: 'Number'
                }
            }
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            err: err.message
        });
    }
}


/*

aladdin/students
aladdin/teachers

*/