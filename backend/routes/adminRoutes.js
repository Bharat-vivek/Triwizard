// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const  adminController= require('../controllers/adminController');

// Route to add a new student
router.post('/add-student', adminController.addStudent);
router.get('/get-students', adminController.getAllStudents);
router.get('/get-students/:mentorId', adminController.getStudentsByMentor);
router.post('/add-mentor', adminController.addMentor);
router.get('/get-mentors', adminController.getAllMentors);
module.exports = router;
