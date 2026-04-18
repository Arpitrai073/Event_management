const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Product = require('../models/Product');
const bcrypt = require('bcryptjs');

const router = express.Router();

// @route   GET /api/admin/users
router.get('/users', protect, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/admin/membership/:id
router.put('/membership/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Entity not found' });
    }
    
    // update membership logic
    if (req.body.duration) {
      user.membership.duration = req.body.duration;
      // extend end date
      const newEndDate = new Date(user.membership.endDate || new Date());
      newEndDate.setMonth(newEndDate.getMonth() + req.body.duration);
      user.membership.endDate = newEndDate;
      user.membership.status = 'Active';
    }
    
    if (req.body.status) {
      user.membership.status = req.body.status;
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/admin/users
router.post('/users', protect, admin, async (req, res) => {
  try {
    const { name, email, role, category } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // use default password "password123"
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      ...(role === 'Vendor' && category ? { category } : {})
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/admin/users/:id
router.put('/users/:id', protect, admin, async (req, res) => {
  try {
    const { name, email, role, category, password } = req.body;
    const user = await User.findById(req.params.id);
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    
    if (user.role === 'Vendor' && category) {
      user.category = category;
    }
    
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/admin/users/:id
router.delete('/users/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // If vendor, delete their products
    if (user.role === 'Vendor') {
      await Product.deleteMany({ vendor: user._id });
    }

    await User.findByIdAndDelete(user._id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
