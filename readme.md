# EmpowerED Hackathon Project

EmpowerED is a full-stack platform designed to support underprivileged girls in education, attendance tracking, mentorship, and career opportunities.

---

## Project Structure

- **Attendance/**: Python scripts for face recognition-based attendance and attention tracking.
- **backend/**: Node.js/Express REST API for students, mentors, admins, quizzes, and internship scraping.
- **frontend/**: React app for user dashboards, quizzes, feedback, and job offers.

---

## Features

- **Face Recognition Attendance**: Automated attendance using webcam and face recognition ([Attendance/app.py](Attendance/app.py)).
- **Quiz Generation**: AI-powered quiz creation and delivery ([backend/controllers/quizController.js](backend/controllers/quizController.js)).
- **Mentor-Student Mapping**: Manage mentor assignments and student analytics ([frontend/src/Components/MentorStudentMapping.jsx](frontend/src/Components/MentorStudentMapping.jsx)).
- **Job/Internship Search**: Scrapes Internshala for relevant opportunities ([backend/server.js](backend/server.js)).
- **Feedback & Analytics**: Collect feedback and visualize grades/attendance.

---

## Getting Started

### 1. Attendance (Python)

- Install dependencies:
  ```sh
  pip install -r Attendance/requirements.txt
  ```
- Run attendance system:
  ```sh
  python Attendance/app.py
  ```

### 2. Backend (Node.js/Express)

- Install dependencies:
  ```sh
  cd backend
  npm install
  ```
- Set up `.env` (see [backend/README.md](backend/README.md))
- Start server:
  ```sh
  npm start
  ```

### 3. Frontend (React)

- Install dependencies:
  ```sh
  cd frontend
  npm install
  ```
- Start development server:
  ```sh
  npm run dev
  ```

---

## API Endpoints

See [backend/README.md](backend/README.md) for full API documentation.

---

## Main Technologies

- Python (OpenCV, face_recognition, Flask)
- Node.js, Express, MongoDB, Mongoose
- React, Chakra UI, Bootstrap, Chart.js

---

## License

MIT License

---


## Useful Links

- [Attendance/app.py](Attendance/app.py)
- [backend/server.js](backend/server.js)
- [frontend/src/App.jsx](frontend/src/App.jsx)