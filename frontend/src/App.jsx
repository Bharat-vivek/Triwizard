import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from './Components/Login'
import './App.css'
import Test from './Components/Test'

import StudentDashboard from './Components/StudentDashboard'
import LoginDashboard from './Components/LoginDashboard';
import FeedbackForm from './Components/Feedback';
import MentorPage from './Components/MentorDashboard';
import MentorStudentMapping from './Components/MentorStudentMapping';
import InstructionPage from './Components/TestInstruction'

import QuizCards from './Components/student/QuizPage';
import StartQuiz from './Components/student/StartQuiz';
import JobOffer from './Components/JobOffers';

const router = createBrowserRouter([
  {
    path: 'student/quiz',
    element: <QuizCards />
  },
  {
    path: 'test/:quizId',
    element: <StartQuiz />
  },
  {
    path: '/',
    element: <LoginDashboard />
  },
  {
    path: '/loginpage',
    element: <LoginPage />
  },
  {
    path: '/studentpage',
    element: <StudentDashboard />
  },
  {
    path: '/testinstruction',
    element: <InstructionPage />
  },
  {
    path: '/joboffers',
    element: <JobOffer />
  },
  {
    path: '/test',
    element: <Test />
  },
  {
    path: '/feedback',
    element: <FeedbackForm />
  },
  {
    path: '/mentor',
    element: <MentorPage />
  }, {
    path: '/ngopage',
    element: <MentorStudentMapping />
  }
]);

function App() {



  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
