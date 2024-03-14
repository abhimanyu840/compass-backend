// sales.controller.js

const Sale = require('../models/sales.model');

// Controller method to fetch daily sales data
exports.getDailySales = async (req, res) => {
    try {
        // Add logic to fetch daily sales data from the database
        // Example:
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

        const dailySales = await Sale.find({ createdAt: { $gte: startOfDay, $lt: endOfDay } });

        res.status(200).json(dailySales);
    } catch (error) {
        console.error('Error fetching daily sales:', error);
        res.status(500).json({ message: 'Failed to fetch daily sales' });
    }
};

// Controller method to fetch weekly sales data
exports.getWeeklySales = async (req, res) => {
    try {
        // Add logic to fetch weekly sales data from the database
        // Example:
        const today = new Date();
        const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
        const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 7);

        const weeklySales = await Sale.find({ createdAt: { $gte: startOfWeek, $lt: endOfWeek } });

        res.status(200).json(weeklySales);
    } catch (error) {
        console.error('Error fetching weekly sales:', error);
        res.status(500).json({ message: 'Failed to fetch weekly sales' });
    }
};

// Controller method to fetch monthly sales data
exports.getMonthlySales = async (req, res) => {
    try {
        // Add logic to fetch monthly sales data from the database
        // Example:
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        const monthlySales = await Sale.find({ createdAt: { $gte: startOfMonth, $lte: endOfMonth } });

        res.status(200).json(monthlySales);
    } catch (error) {
        console.error('Error fetching monthly sales:', error);
        res.status(500).json({ message: 'Failed to fetch monthly sales' });
    }
};

// Controller method to fetch custom sales data (e.g., by date range)
exports.getCustomSales = async (req, res) => {
    try {
        // Add logic to fetch custom sales data based on date range from the database
        // Example:
        const { startDate, endDate } = req.query;

        const customSales = await Sale.find({ createdAt: { $gte: startDate, $lte: endDate } });

        res.status(200).json(customSales);
    } catch (error) {
        console.error('Error fetching custom sales:', error);
        res.status(500).json({ message: 'Failed to fetch custom sales' });
    }
};
