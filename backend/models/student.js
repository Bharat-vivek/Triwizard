const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
// Define the schema
const studentSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4, // Automatically generate a unique ID
        unique: true
      },
  username: {
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
  },
  test: [{
    testName: String,    // The name or type of the test
    score: Number,       // The score or result of the test
    date: {
      type: Date,
      default: Date.now  // The date when the test was taken
    }
  }],
  attendance: [{
    date: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['Present', 'Absent', 'Late'],
      default: 'Absent'
    }
  }],
  feedback: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  mentor:{
    type: String,
    required: true
  }
});

// Create the model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
