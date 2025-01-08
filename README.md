# Quiz App Backend

This project is a backend service for a quiz application, implementing RESTful APIs for managing quizzes, answering questions, and retrieving results. The backend is built using Node.js with Express and uses an in-memory datastore.

## Features

- **Create Quiz**: Add quizzes with multiple-choice questions.
- **Retrieve Quiz**: Fetch a quiz by its ID (excluding correct answers).
- **Submit Answer**: Submit answers to specific quiz questions and get immediate feedback.
- **Get Results**: Retrieve scores and answer summaries for users.

---

## Setup Instructions

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the server:
   ```bash
   npm start
   ```
   The server will start on `http://localhost:3000`.

---

## API Endpoints

### 1. Create a Quiz
- **Endpoint**: `POST /quiz`
- **Description**: Create a new quiz with multiple-choice questions.
- **Request Body**:
  ```json
  {
    "title": "Sample Quiz",
    "questions": [
      {
        "id": "q1",
        "text": "What is 2 + 2?",
        "options": ["1", "2", "3", "4"],
        "correct_option": 3
      }
    ]
  }
  ```
- **Response**:
  ```json
  {
    "id": "quiz1"
  }

### 2. Retrieve a Quiz
- **Endpoint**: `GET /quiz/:id`
- **Description**: Fetch a quiz by its ID (without revealing correct answers).
- **Response**:
  ```json
  {
    "id": "quiz1",
    "title": "Sample Quiz",
    "questions": [
      {
        "id": "q1",
        "text": "What is 2 + 2?",
        "options": ["1", "2", "3", "4"]
      }
    ]
  }
  ```

### 3. Submit an Answer
- **Endpoint**: `POST /quiz/:id/answer`
- **Description**: Submit an answer for a specific question in a quiz.
- **Request Body**:
  ```json
  {
    "question_id": "q1",
    "selected_option": 3,
    "user_id": "user1"
  }
  ```
- **Response (Correct Answer)**:
  ```json
  {
    "is_correct": true
  }
  ```
- **Response (Incorrect Answer)**:
  ```json
  {
    "is_correct": false,
    "correct_option": 3
  }
  ```

### 4. Get Results
- **Endpoint**: `GET /quiz/:id/results/:user_id`
- **Description**: Retrieve a user’s results for a specific quiz.
- **Response**:
  ```json
  {
    "score": 1,
    "answers": [
      {
        "question_id": "q1",
        "selected_option": 3,
        "is_correct": true
      }
    ]
  }
  ```

---

## Running Tests

The project includes unit tests for all APIs. Tests are written using Jest and Supertest.

1. Run tests:
   ```bash
   npm test
   ```

2. View coverage:
   ```bash
   npm run test:coverage
   ```

---

## Project Structure

```
project-root/
├── api/
│   ├── createQuiz/
│   │   ├── createQuiz.js
│   │   ├── createQuiz.test.js
│   ├── getQuiz/
│   │   ├── getQuiz.js
│   │   ├── getQuiz.test.js
│   ├── submitAnswer/
│   │   ├── submitAnswer.js
│   │   ├── submitAnswer.test.js
│   ├── getResults/
│   │   ├── getResults.js
│   │   ├── getResults.test.js
├── utils/
│   ├── dataStore.js
├── index.js
├── package.json
├── .gitignore
└── README.md
```

---

## Known Issues

- Currently uses in-memory storage. Data will be lost when the server restarts.
- No authentication or user validation.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

