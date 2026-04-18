const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

const router = express.Router();

// Get vendors by category
router.get('/vendors', protect, async (req, res) => {
  try {
    const vendors = await User.find({ role: 'Vendor' }).select('-password');
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get products
router.get('/products', protect, async (req, res) => {
  try {
    const products = await Product.find({ status: 'Available' }).populate('vendor', 'name category');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit Order (Checkout)
router.post('/order', protect, async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod, shippingAddress } = req.body;
    
    if (items && items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      paymentMethod,
      shippingAddress
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get my orders
router.get('/orders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
