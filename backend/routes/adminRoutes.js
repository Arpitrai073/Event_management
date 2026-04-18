const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const User = require('../models/User');

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
    if (!user || user.role !== 'Vendor') {
      return res.status(404).json({ message: 'Vendor not found' });
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

module.exports = router;
