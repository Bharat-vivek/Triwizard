const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.post('/add-quiz/', quizController.addQuiz);
router.get('/get-quizzes/:mentorId', quizController.getQuizzesByMentor);
router.get('/getQuizById/:id', quizController.getQuizById);
router.get('/get-quiz',quizController.getQuiz);
module.exports = router;
