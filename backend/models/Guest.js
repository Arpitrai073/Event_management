const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Guest', GuestSchema);
