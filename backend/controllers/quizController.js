const { chatSession } = require('../config/generativeAI');
const Quiz = require('../models/quiz');


exports.addQuiz = async (req, res) => {
  const { course, difficulty, numberQuestions,startTime, endTime } = req.body;

  // In your controller
if (new Date(startTime) >= new Date(endTime)) {
  return res.status(400).json({ message: 'End time must be after start time' });
}


  const InputPrompt = `You are an AI that generates quizzes. Given the following information, create a quiz with multiple-choice questions:

- Course: ${course}
- Difficulty: ${difficulty}
- Number of Questions: ${numberQuestions}

For each question:
- Provide the question text.
- Provide a list of options (at least 4 options).
- Specify the correct answer from the options.

Respond with a JSON object that contains an array of questions. Each question should have:
- "question": The question text.
- "options": An array of strings where each string is an option.
- "correctAnswer": The correct option.

Example format:
{
  "questions": [
    {
      "question": "What is the capital of France?",
      "options": ["Paris", "London", "Berlin", "Madrid"],
      "correctAnswer": "Paris"
    },
    ...
  ]
}
NOTE: THIS IS AN EXAMPLE YOU HAVE TO MAKE THE QUIZ ACCORDING TO course=${course}, difficulty=${difficulty}, number of questions=${numberQuestions}
Make sure the response is in JSON format and does not contain any additional text or explanation.`; // Use the refined InputPrompt here

  try {
    const result = await chatSession.sendMessage(InputPrompt);
    console.log(result);
    if (new Date(startTime) >= new Date(endTime)) {
      return res.status(400).json({ message: 'End time must be after start time' });
    }
    // Ensure to handle and clean up the response text
    let responseText = result.response.text();
    responseText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();

    // Parse the cleaned JSON response
    const parsedResponse = JSON.parse(responseText);

    const quiz = new Quiz({
      course,
      difficulty,
      numberQuestions,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      questions: parsedResponse.questions,
    });

    const savedQuiz = await quiz.save();
    res.status(201).json({ message: 'Quiz saved successfully', quiz: savedQuiz });

  } catch (error) {
    console.error('Error during chat session or database operation:', error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

exports.getQuizzesByMentor = async (req, res) => {
  const { mentorId } = req.params;

  try {
    const quizzes = await Quiz.find({ createdBy:mentorId });
    if (!quizzes.length) {
      return res.status(404).json({ message: 'No quizzes found for this mentor' });
    }
    res.status(200).json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};
exports.getQuiz=async(req,res)=>{
  try {
    const quizzes = await Quiz.find();
    if (!quizzes.length) {
      return res.status(404).json({ message: 'No quizzes found for this mentor' });
    }
    res.status(200).json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};
exports.getQuizById = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the quiz with the given id
    const quiz = await Quiz.findOne({ id });  // Using findOne instead of find since you're expecting a single quiz

    if (!quiz) {
      return res.status(404).json({ message: 'No quiz found for this id' });
    }

    const currentTime = new Date();

    // Check if the quiz has started
    if (currentTime < quiz.startTime) {
      return res.status(403).json({ message: 'Quiz has not started yet' });
    }

    // Check if the quiz has ended
    if (currentTime > quiz.endTime) {
      return res.status(403).json({ message: 'Quiz has ended' });
    }

    // Return the quiz data
    res.status(200).json(quiz);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};
