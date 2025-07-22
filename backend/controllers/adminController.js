const Mentor = require('../models/mentor');

exports.addMentor = async (req, res) => {
  const { name, email, phoneNumber, password } = req.body;

  try {
    // Create a new mentor document
    const newMentor = new Mentor({
      name,
      email,
      phoneNumber,
      password
    });

    // Save the mentor to the database
    const savedMentor = await newMentor.save();

    // Respond with the saved mentor
    res.status(201).json({
      message: 'Mentor added successfully',
      mentor: savedMentor
    });
  } catch (error) {
    console.error('Error adding mentor:', error);
    res.status(500).json({
      message: 'An error occurred while adding the mentor',
      error: error.message
    });
  }
};
// Get all mentors
exports.getAllMentors = async (req, res) => {
    try {
      const mentors = await Mentor.find();
      res.status(200).json(mentors);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch mentors', error: error.message });
    }
  };
  // controllers/studentController.js
const Student = require('../models/student');

exports.addStudent = async (req, res) => {
  const { username, test, email,password, mentor } = req.body;

  try {
    // Create a new student document
    const newStudent = new Student({
      username,
      test,
      email,
      password,
      mentor
    });

    // Save the student to the database
    const savedStudent = await newStudent.save();

    // Respond with the saved student
    res.status(201).json({
      message: 'Student added successfully',
      student: savedStudent
    });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({
      message: 'An error occurred while adding the student',
      error: error.message
    });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch students', error: error.message });
  }
};
exports.getStudentsByMentor = async (req, res) => {
    const mentorId = req.params.mentorId;
    console.log("Hello")
    console.log(mentorId);
    try {
      const students = await Student.find({ mentor: mentorId });
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching students', error: error.message });
    }
  };