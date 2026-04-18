const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Vendor', 'User'], required: true },
  
  // Vendor specific fields
  category: { 
    type: String, 
    enum: ['Catering', 'Florist', 'Decoration', 'Lighting'],
    required: function() { return this.role === 'Vendor'; }
  },
  membership: {
    duration: { type: Number, enum: [6, 12, 24] },
    startDate: { type: Date },
    endDate: { type: Date },
    status: { type: String, enum: ['Active', 'Cancelled', 'Expired'] }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
