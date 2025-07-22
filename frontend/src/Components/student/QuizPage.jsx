import React, { useEffect, useState } from 'react';
import { Box, Card, CardBody, CardHeader, Heading, Text, Stack, SimpleGrid, Flex, Button } from '@chakra-ui/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MotionCard = motion(Card);

function QuizCards() {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use navigate to redirect

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/quiz/get-quiz'); // Adjust the URL as needed
        setQuizzes(response.data);
      } catch (err) {
        setError('Failed to fetch quizzes');
      }
    };

    fetchQuizzes();
  }, []);

  const handleStartTest = (quizId) => {
    navigate(`/test/${quizId}`);
  };

  return (
    <Box p={5} bgGradient="linear(to-r, blue.50, teal.50)">
      <Heading mb={6} textAlign="center" color="blue.600">Quizzes</Heading>
      {error && <Text color="red.500" mb={4} textAlign="center">{error}</Text>}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {quizzes.map((quiz) => (
          <MotionCard
            key={quiz._id}
            p={5}
            shadow="xl"
            borderWidth="1px"
            borderRadius="md"
            bgGradient="linear(to-tl, white, gray.100)"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <CardHeader>
              <Flex align="center" justify="space-between">
                <Heading size="lg" color="blue.500">{quiz.course}</Heading>
              </Flex>
            </CardHeader>
            <CardBody>
              <Stack spacing={4}>
                <Text fontSize="lg" fontWeight="bold">Difficulty: {quiz.difficulty}</Text>
                <Text fontSize="lg">Number of Questions: {quiz.numberQuestions}</Text>
              </Stack>
            </CardBody>
            <Flex justify="center" mt={4}>
              <Button colorScheme="blue" variant="outline" onClick={() => handleStartTest(quiz.id)}>Start Test</Button>
            </Flex>
          </MotionCard>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default QuizCards;
