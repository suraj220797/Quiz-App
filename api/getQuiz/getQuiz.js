const express = require('express');
const router = express.Router();
const { quizzes } = require('../../utils/dataStore');

// API to fetch a quiz by its ID
// Returns the quiz details excluding the correct answers
router.get('/quiz/:id', (req, res) => {
    const quizId = req.params.id;
    const quiz = quizzes[quizId];

    if (!quiz) {
        // Return 404 if the quiz does not exist
        return res.status(404).json({ error: 'Quiz not found' });
    }

    // Remove the correct answers from the response
    const quizWithoutAnswers = {
        id: quiz.id,
        title: quiz.title,
        questions: quiz.questions.map(q => ({
            id: q.id,
            text: q.text,
            options: q.options
        }))
    };

    res.json(quizWithoutAnswers);
});

module.exports = router;