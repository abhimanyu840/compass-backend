// order.controller.js

const Order = require('../models/order.model');

// Controller method to create a new order
exports.createOrder = async (req, res) => {
    try {
        const { userId, productId,  totalPrice, status } = req.body;
        const order = new Order({ userId, productId,  totalPrice, status });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Failed to create order' });
    }
};

// Controller method to get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
};

// Controller method to get a specific order by ID
exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Failed to fetch order' });
    }
};

// Controller method to get a specific order by User ID
exports.getOrderByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const order = await Order.find({ userId });
        if (!order) {
            return res.status(404).json({ message: 'No Order For this Id' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Failed to fetch order' });
    }
};

// Controller method to update an existing order
exports.updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const updates = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(orderId, updates, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Failed to update order' });
    }
};

// Controller method to delete an existing order
exports.deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Failed to delete order' });
    }
};
