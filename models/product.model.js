// product.model.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['course', 'event'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: function () {
            return this.type === 'event';
        }
    },
    endDate: {
        type: Date,
        required: function () {
            return this.type === 'event';
        }
    },
    duration: {
        type: Number,
        required: function () {
            return this.type === 'course';
        }
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
