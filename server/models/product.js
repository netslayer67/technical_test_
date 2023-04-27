const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    uom: {
        type: String,
        enum: ['SHEET', 'ROLL', 'PCS'],
        required: true,
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
