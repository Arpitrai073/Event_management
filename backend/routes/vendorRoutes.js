const express = require('express');
const { protect, vendor } = require('../middleware/authMiddleware');
const Product = require('../models/Product');
const Order = require('../models/Order');

const router = express.Router();

// @route   GET /api/vendor/products
router.get('/products', protect, vendor, async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.user._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/vendor/products
router.post('/products', protect, vendor, async (req, res) => {
  try {
    const { name, price, imageUrl, status } = req.body;
    const product = await Product.create({
      vendor: req.user._id,
      name,
      price,
      imageUrl,
      status
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete product
router.delete('/products/:id', protect, vendor, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, vendor: req.user._id });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// View requested transactions (orders)
router.get('/requests', protect, vendor, async (req, res) => {
  try {
    // Basic implementation: vendor sees all orders containing their products
    const orders = await Order.find().populate('user', 'name email').populate('items.product');
    // Filter orders that have items belonging to this vendor
    const vendorOrders = orders.filter(order => 
      order.items.some(item => item.product && item.product.vendor.toString() === req.user._id.toString())
    );
    res.json(vendorOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status
router.put('/order-status/:id', protect, vendor, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
