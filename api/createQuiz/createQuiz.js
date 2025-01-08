const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const { quizzes, validateQuiz } = require('../../utils/dataStore');

// API to create a new quiz
// Accepts a JSON payload containing the quiz title and questions
// Returns the unique ID of the created quiz
router.post('/quiz', (req, res) => {
    try {
        const quiz = req.body;

        // Validate the quiz structure
        if (!validateQuiz(quiz)) {
            return res.status(400).json({ error: 'Invalid quiz structure' });
        }

        // Generate a unique ID for the quiz
        const quizId = uuidv4();
        quizzes[quizId] = { id: quizId, title: quiz.title, questions: quiz.questions };

        // Respond with the created quiz ID
        res.status(201).json({ id: quizId });
    } catch (error) {
        // Handle unexpected errors
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;