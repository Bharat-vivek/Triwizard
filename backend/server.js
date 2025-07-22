const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const quizRoutes = require('./routes/quizRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const { Parser } = require('json2csv');
const fs = require('fs');
dotenv.config();

// Import the models
const Student = require('./models/student');  // Adjust the path as necessary
const Mentor = require('./models/mentor');    // Adjust the path as necessary
const Admin = require('./models/admin');


const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

app.use('/api/quiz', quizRoutes);

app.use('/api/admin', adminRoutes);
// app.use('/api/student', studentRoutes);
// app.use('/api/mentor', mentorRoutes);


// app.post('/api/test', (req, res) => {
//   res.send('Test route working!');
// });

app.post('/api/login', async (req, res) => {
  const { username, password, role } = req.body;

  let user = null;

  if (role === 'student') {
    user = await Student.findOne({ username, password });
  } else if (role === 'mentor') {
    user = await Mentor.findOne({ username, password });
  } else if (role === 'admin') {
    user = await Admin.findOne({ username, password });
  } else {
    return res.status(400).json({ message: 'Invalid role selected' });
  }

  if (user) {
    return res.json({ role, user });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Function to scrape internships based on user-provided topic
async function scrapeInternshala(topic) {
  try {
    // Construct the URL dynamically based on the topic
    const searchUrl = `https://internshala.com/internships/${encodeURIComponent(topic)}-internship`;

    // Send a GET request to the search results page
    const response = await axios.get(searchUrl);

    // Load the HTML content into Cheerio
    const $ = cheerio.load(response.data);

    // Extract job titles and company names from the first 10 internships
    const internships = [];
    $('.internship_meta').slice(2, 12).each((index, element) => {
      const jobTitle = $(element).find('.company > .job-internship-name').text().trim();
      const companyName = $(element).find('.company > .company_name > .company_and_premium > .company-name').text().trim();
      const location = $(element).find('.individual_internship_details > .detail-row-1 > .locations').children('span:first').children('a').text().trim();
      const duration = $(element).find('.individual_internship_details > .detail-row-1 > .row-1-item').children('span:eq(1)').text().trim();
      const stipend = $(element).find('.individual_internship_details > .detail-row-1 > .row-1-item').children('span:eq(2)').text().trim();
      const link = `https://internshala.com${$(element).parent('div').attr('data-href')}`;
      internships.push({ jobTitle, companyName, location, duration, stipend, link });
    });

    return internships;
  } catch (error) {
    console.error('Error during scraping:', error);
    return [];
  }
}
function convertJsonToCsv(jsonData) {
  try {
    const json2csvParser = new Parser();
    const csvData = json2csvParser.parse(jsonData);

    // Write the CSV data to a file
    fs.writeFileSync('output.csv', csvData, 'utf8');
    console.log('JSON data successfully converted to CSV and saved to output.csv');
  } catch (error) {
    console.error('Error converting JSON to CSV:', error);
  }
}

// API endpoint to get internships based on topic
app.get('/scrape/:topic', async (req, res) => {
  const topic = req.params.topic;
  const internships = await scrapeInternshala(topic);
  convertJsonToCsv(internships);
  res.json(internships);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
