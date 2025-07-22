const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import uuid

// Define the schema
const mentorSchema = new mongoose.Schema({
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
  phoneNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the model
const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = Mentor;
