# Frontend Routes Documentation

This frontend uses React, Vite, Chakra UI, Bootstrap, and React Router for navigation. Below are **all compulsory routes** and their components. These routes are essential for the core functionality of the application.

## Compulsory Routes

| Path                   | Component                        | Description                                      | Access      |
|------------------------|----------------------------------|--------------------------------------------------|-------------|
| `/`                    | `LoginDashboard`                 | Landing page with info and signup/login options   | Public      |
| `/loginpage`           | `LoginPage`                      | Login and signup form for users                   | Public      |
| `/studentpage`         | `StudentDashboard`               | Student dashboard with grades, attendance, charts | Student     |
| `/student/quiz`        | `QuizCards`                      | List of available quizzes for students            | Student     |
| `/test/:quizId`        | `StartQuiz`                      | Start and take a quiz by quiz ID                  | Student     |
| `/testinstruction`     | `InstructionPage`                | Test instructions before starting a quiz          | Student     |
| `/feedback`            | `FeedbackForm`                   | Submit feedback form                              | Student     |
| `/mentor`              | `MentorDashboard`                | Mentor dashboard with analytics and quiz creation | Mentor      |
| `/ngopage`             | `MentorStudentMapping`           | NGO dashboard for mentor-student mapping          | NGO/Mentor  |
| `/joboffers`           | `JobOffer`                       | Internship/job offers search page                 | Student     |

## Route Details

- **Public Routes:** Accessible without authentication.
- **Student Routes:** Require student login.
- **Mentor/NGO Routes:** Require mentor or NGO login.

## Notes

- All navigation is handled via React Router.
- Most pages use Chakra UI and Bootstrap for styling.
- Quiz and feedback data is fetched from the backend API.
- For more details, see the individual component files in
