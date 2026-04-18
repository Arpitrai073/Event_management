const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');
const Guest = require('../models/Guest');

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
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .populate('user', 'name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get my guests
router.get('/guests', protect, async (req, res) => {
  try {
    const guests = await Guest.find({ user: req.user._id });
    res.json(guests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a guest
router.post('/guest', protect, async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const guest = await Guest.create({ user: req.user._id, name, email, phone });
    res.status(201).json(guest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a guest
router.put('/guest/:id', protect, async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const guest = await Guest.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { name, email, phone },
      { new: true }
    );
    if (!guest) return res.status(404).json({ message: 'Guest not found' });
    res.json(guest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a guest
router.delete('/guest/:id', protect, async (req, res) => {
  try {
    const guest = await Guest.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!guest) return res.status(404).json({ message: 'Guest not found' });
    res.json({ message: 'Guest deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
