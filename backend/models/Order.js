const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['Cash', 'UPI'], required: true },
  shippingAddress: {
    name: String,
    email: String,
    number: String,
    address: String,
    city: String,
    state: String,
    pinCode: String
  },
  status: { 
    type: String, 
    enum: ['Received', 'Ready for Shipping', 'Out for Delivery', 'Cancelled'],
    default: 'Received'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
