const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  status: { type: String, enum: ['Available', 'Unavailable'], default: 'Available' }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
