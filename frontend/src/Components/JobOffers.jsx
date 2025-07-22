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
} from '@chakra-ui/react';

function JobOffer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/scrape/${encodeURIComponent(searchTerm)}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Box
      w="100vw" // set width to full window width
      h="100vh" // set height to full window height
      p={4}
      bgColor="#d1f1f0" // wheat color
    >
      <Heading
        as="h1"
        size="lg"
        mb={4}
        color="black" // set heading color to black
      >
        Internship Search
      </Heading>
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter topic..."
        size="xl" // increased size to xl
        mb={15}
        mt={15}
        fontSize="lg" // increased font size to lg
        py={9} // increased padding to make the input taller
        px={6} // increased padding to make the input wider
        w="100%" // set input width to 100%
      />
      <Button
        onClick={handleSearch}
        colorScheme="blue"
        size="xl" // increased size to xl
        mb={4}
        ml={10}
        fontSize="lg" // increased font size to lg
        py={10} // increased padding to make the button taller
        px={16} // increased padding to make the button wider
        _hover={{
          transform: 'scale(1.1)',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.35)',
        }}
        _active={{
          transform: 'scale(0.9)',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.35)',
        }}
      >
        Search
      </Button>

      {results.length > 0 && (
        <Table
          variant="striped"
          colorScheme="gray"
          border="1px solid #ddd"
          borderRadius="10px"
          boxShadow="10px 10px 30px rgba(0, 0, 0, 0.85)"
          bg="gray.50" // set table background color to light gray
          maxWidth="100vw"// fit to the window screen
          overflowX="auto" // add horizontal scrollbar when table is too wide
          mt={{ base: 10, md: 15, lg: 20 }} // set responsive margin top
        >
          <Thead>
            <Tr borderBottom="1px solid #ddd">
              <Th px={6} py={4} borderRight="1px solid #ddd">Job Title</Th>
              <Th px={6} py={4} borderRight="1px solid #ddd">Company Name</Th>
              <Th px={6} py={4} borderRight="1px solid #ddd">Location</Th>
              <Th px={6} py={4} borderRight="1px solid #ddd">Duration</Th>
              <Th px={6} py={4} borderRight="1px solid #ddd">Stipend</Th>
              <Th px={6} py={4}>Link</Th>
            </Tr>
          </Thead>
          <Tbody>
            {results.map((internship, index) => (
              <Tr key={index} borderBottom="1px solid #ddd" py={4}>
                <Td px={6} py={4} borderRight="1px solid #ddd">{internship.jobTitle}</Td>
                <Td px={6} py={4} borderRight="1px solid #ddd">{internship.companyName}</Td>
                <Td px={6} py={4} borderRight="1px solid #ddd">{internship.location}</Td>
                <Td px={6} py={4} borderRight="1px solid #ddd">{internship.duration}</Td>
                <Td px={6} py={4} borderRight="1px solid #ddd">{internship.stipend}</Td>
                <Td px={6} py={4}>
                  <Link href={internship.link} target="_blank" rel="noopener noreferrer">
                    Apply
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}

export default JobOffer;
