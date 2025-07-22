const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import uuid

// Define the schema
const adminSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4, // Automatically generate a unique ID
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create the model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;