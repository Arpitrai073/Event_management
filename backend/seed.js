const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config();

const encryptPass = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany();
    await Product.deleteMany();

    const pass = await encryptPass('password123');

    const users = await User.insertMany([
      { name: 'Admin One', email: 'admin@test.com', password: pass, role: 'Admin' },
      { 
        name: 'Vendor Catering', email: 'vendor1@test.com', password: pass, role: 'Vendor', 
        category: 'Catering', membership: { duration: 6, status: 'Active', startDate: new Date() }
      },
      { 
        name: 'Vendor Florist', email: 'vendor2@test.com', password: pass, role: 'Vendor', 
        category: 'Florist', membership: { duration: 12, status: 'Active', startDate: new Date() }
      },
      { name: 'User One', email: 'user@test.com', password: pass, role: 'User' }
    ]);

    const vendor1 = users[1]._id;

    await Product.insertMany([
      { vendor: vendor1, name: 'Deluxe Buffet', price: 500, imageUrl: 'https://via.placeholder.com/150', status: 'Available' },
      { vendor: vendor1, name: 'Standard Drinks', price: 100, imageUrl: 'https://via.placeholder.com/150', status: 'Available' }
    ]);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
