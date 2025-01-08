const express = require('express');
const router = express.Router();
const { results } = require('../../utils/dataStore');

// API to fetch the results for a specific quiz and user
// Returns the user's score and a summary of their answers
router.get('/quiz/:id/results/:user_id', (req, res) => {
    const { id: quizId, user_id } = req.params;
    const quizResults = results[quizId]?.[user_id];

    if (!quizResults) {
        // Return 404 if no results exist for the quiz and user
        return res.status(404).json({ error: 'Results not found' });
    }

    res.json({
        score: quizResults.score,
        answers: quizResults.answers
    });
});

module.exports = router;