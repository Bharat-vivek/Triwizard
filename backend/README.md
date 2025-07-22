# Backend API Documentation

## Overview

This backend provides RESTful APIs for managing students, mentors, admins, quizzes, and internship scraping. It uses Node.js, Express, MongoDB (via Mongoose), and integrates with Google Generative AI for quiz generation.

---

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Environment Variables:**
   - Create a `.env` file with:
     ```
     MONGODB_URI=your_mongodb_connection_string
     NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
     ```
3. **Start the server:**
   ```sh
   npm start
   ```
   The server runs on port `3000` by default.

---

## Routes

### Auth

- **POST `/api/login`**
  - Body: `{ username, password, role }`
  - Returns: `{ role, user }` on success

---

### Quiz

- **POST `/api/quiz/add-quiz/`**
  - Body: `{ course, difficulty, numberQuestions, startTime, endTime }`
  - Generates and saves a quiz using Gemini AI.

- **GET `/api/quiz/get-quiz`**
  - Returns all quizzes.

- **GET `/api/quiz/getQuizById/:id`**
  - Returns quiz by unique id (only if quiz is active).

- **GET `/api/quiz/get-quizzes/:mentorId`**
  - Returns quizzes created by a mentor (if implemented).

---

### Admin

- **POST `/api/admin/add-student`**
  - Body: `{ username, test, email, password, mentor }`
  - Adds a new student.

- **GET `/api/admin/get-students`**
  - Returns all students.

- **GET `/api/admin/get-students/:mentorId`**
  - Returns students assigned to a mentor.

- **POST `/api/admin/add-mentor`**
  - Body: `{ name, email, phoneNumber, password }`
  - Adds a new mentor.

- **GET `/api/admin/get-mentors`**
  - Returns all mentors.

---

### Internship Scraping

- **GET `/scrape/:topic`**
  - Scrapes Internshala for internships related to `:topic`.
  - Returns array of internships and saves results to `output.csv`.

---

## Models

- **Student:** [`models/student.js`](models/student.js)
- **Mentor:** [`models/mentor.js`](models/mentor.js)
- **Admin:** [`models/admin.js`](models/admin.js)
- **Quiz:** [`models/quiz.js`](models/quiz.js)

---

## Notes

- All routes expect and return JSON.
- Quiz generation uses Google Gemini AI via [`config/generativeAI.js`](config/generativeAI.js).
- For scraping, ensure internet access and that Internshala's structure hasn't changed.

---

## Useful Files

- Main server: [`server.js`](server.js)
- Quiz controller: [`controllers/quizController.js`](controllers/quizController.js)
- Admin controller: [`controllers/adminController.js`](controllers/adminController.js)
- Quiz routes: [`routes/quizRoutes.js`](routes/quizRoutes.js)
- Admin routes: [`routes/adminRoutes.js`](routes/adminRoutes.js)

---

## License