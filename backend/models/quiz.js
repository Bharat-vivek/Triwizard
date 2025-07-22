const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const quizSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,  // Generate a unique ID for each question
    unique: true      // Ensure that the ID is unique within the collection
  },
  course: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  numberQuestions: {
    type: Number,
    required: true
  },
  questions: [{
    question: {
      type: String,
      required: true
    },
    options: {
      type: [String], // Array of strings
      required: true
    },
    correctAnswer: {
      type: String,
      required: true
    }
  }],
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
