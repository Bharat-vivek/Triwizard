import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Box, Text, Radio, RadioGroup, VStack, Heading, Alert, AlertIcon } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

const StartQuiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);  // Array to store selected options
  const [score, setScore] = useState(0);
  const { quizId } = useParams();  // Extracting quizId from the URL parameters
  const toast = useToast();
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/quiz/getQuizById/${quizId}`);
        setQuiz(response.data);  // Assuming the API response contains the quiz data directly
      } catch (error) {
        console.error('Error fetching the quiz:', error);
        toast({
          title: "Error fetching quiz.",
          description: "There was an issue fetching the quiz. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchQuiz();
  }, [quizId, toast]);  // Adding quizId and toast as dependencies

  const handleOptionChange = (option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestionIndex] = option;
    setSelectedOptions(updatedOptions);
  };

  const handleSubmitAnswer = () => {
    if (quiz) {
      const currentQuestion = quiz.questions[currentQuestionIndex];
      const selectedOption = selectedOptions[currentQuestionIndex];
      if (selectedOption === currentQuestion.correctAnswer) {
        setScore(score + 1);
      }
  
      // Move to the next question
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // End of quiz
        toast({
          title: "Quiz Completed!",
          description: `Your score is ${score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0)} / ${quiz.questions.length}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setComplete(true);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (complete && quiz) {
    return (
      <Box p={6} maxW="container.md" mx="auto">
        <Heading mb={6} textAlign="center">Quiz Feedback</Heading>
        <Box bg="white" p={6} shadow="md" borderRadius="md">
          <Heading size="lg" mb={4}>Your Score: {score} / {quiz.questions.length}</Heading>
          <VStack spacing={4} align="stretch">
            {quiz.questions.map((question, index) => (
              <Box key={index} bg="gray.100" p={4} borderRadius="md" borderWidth={1}>
                <Text fontSize="md" mb={2}><strong>Question:</strong> {question.question}</Text>
                <Text fontSize="md" mb={2}><strong>Your Answer:</strong> {selectedOptions[index] || 'Not Answered'}</Text>
                <Text fontSize="md" mb={2}><strong>Correct Answer:</strong> {question.correctAnswer}</Text>
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>
    );
  }

  return (
    <Box p={6} maxW="container.md" mx="auto">
      <Heading mb={6} textAlign="center">Quiz</Heading>
      {quiz ? (
        <VStack spacing={4} align="stretch">
          <Box bg="white" p={6} shadow="md" borderRadius="md">
            <Text fontSize="lg" mb={4}>{quiz.questions[currentQuestionIndex].question}</Text>
            <RadioGroup value={selectedOptions[currentQuestionIndex] || ''} onChange={handleOptionChange}>
              <VStack spacing={4} align="stretch">
                {quiz.questions[currentQuestionIndex].options.map((option, index) => (
                  <Radio key={index} value={option} p={4} borderWidth={1} borderRadius="md" _checked={{ bg: "blue.500", color: "white" }}>
                    {option}
                  </Radio>
                ))}
              </VStack>
            </RadioGroup>
          </Box>
          <Box mt={4}>
            <Button
              colorScheme="blue"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              mr={4}
            >
              Previous
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleSubmitAnswer}
            >
              {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next'}
            </Button>
          </Box>
        </VStack>
      ) : (
        <Alert status="info">
          <AlertIcon />
          Loading quiz...
        </Alert>
      )}
    </Box>
  );
};

export default StartQuiz;
