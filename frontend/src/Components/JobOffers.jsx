import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Flex,
  useToast,
  Text,
} from '@chakra-ui/react';

function JobOffer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const toast = useToast();

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast({
        title: 'Search term is empty.',
        description: 'Please enter a keyword to search for internships.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/scrape/${encodeURIComponent(searchTerm)}`);
      setResults(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch internships. Please try again.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Box
      w="100vw"
      minH="100vh"
      p={{ base: 4, md: 8 }}
      bgGradient="linear(to-r, teal.100, blue.100)"
    >
      <Heading
        as="h1"
        size="2xl"
        textAlign="center"
        mb={10}
        color="teal.800"
      >
        🔍 Internship Explorer
      </Heading>

      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap={4}
        align="center"
        justify="center"
        mb={10}
      >
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter a keyword (e.g., React, Python, Design)"
          size="lg"
          w={{ base: '100%', md: '60%' }}
          bg="white"
          borderColor="teal.400"
          _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
        />
        <Button
          onClick={handleSearch}
          colorScheme="teal"
          size="lg"
          px={10}
          py={6}
          fontWeight="bold"
          _hover={{
            transform: 'scale(1.05)',
            bg: 'teal.500',
            color: 'white',
          }}
          _active={{
            transform: 'scale(0.95)',
            bg: 'teal.700',
          }}
        >
          🚀 Search
        </Button>
      </Flex>

      {results.length > 0 ? (
        <Box
          overflowX="auto"
          borderRadius="md"
          boxShadow="xl"
          bg="white"
          p={4}
        >
          <Table variant="simple" size="md">
            <Thead bg="teal.500">
              <Tr>
                {['Job Title', 'Company', 'Location', 'Duration', 'Stipend', 'Apply'].map((heading, i) => (
                  <Th key={i} color="white" textAlign="center">{heading}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {results.map((internship, index) => (
                <Tr
                  key={index}
                  _hover={{ bg: 'gray.100', transition: '0.2s' }}
                >
                  <Td textAlign="center">{internship.jobTitle}</Td>
                  <Td textAlign="center">{internship.companyName}</Td>
                  <Td textAlign="center">{internship.location}</Td>
                  <Td textAlign="center">{internship.duration}</Td>
                  <Td textAlign="center">{internship.stipend}</Td>
                  <Td textAlign="center">
                    <Link
                      href={internship.link}
                      color="blue.500"
                      fontWeight="bold"
                      target="_blank"
                      rel="noopener noreferrer"
                      _hover={{ textDecoration: 'underline' }}
                    >
                      Apply
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      ) : (
        <Text textAlign="center" fontSize="lg" color="gray.700" mt={10}>
          {searchTerm ? 'No internships found. Try another keyword.' : 'Start your search to find internships.'}
        </Text>
      )}
    </Box>
  );
}

export default JobOffer;
