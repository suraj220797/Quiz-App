const express = require('express');
const router = express.Router();
const { quizzes, results } = require('../../utils/dataStore');

// API to submit an answer for a specific question in a quiz
// Returns immediate feedback on whether the answer is correct
router.post('/quiz/:id/answer', (req, res) => {
    const quizId = req.params.id;
    const { question_id, selected_option, user_id } = req.body;
  
    const quiz = quizzes[quizId];
    if (!quiz) {
        // Return 404 if the quiz does not exist
        return res.status(404).json({ error: 'Quiz not found' });
    }

    const question = quiz.questions.find(q => q.id === question_id);
    if (!question) {
        // Return 404 if the question does not exist
        return res.status(404).json({ error: 'Question not found' });
    }

    const isCorrect = question.correct_option === selected_option;

    // Initialize result storage for the quiz and user if not already present
    if (!results[quizId]) {
        results[quizId] = {};
    }
    if (!results[quizId][user_id]) {
        results[quizId][user_id] = { score: 0, answers: [] };
    }

    // Record the answer
    results[quizId][user_id].answers.push({
        question_id,
        selected_option,
        is_correct: isCorrect
    });

    // Update the user's score if the answer is correct
    if (isCorrect) {
        results[quizId][user_id].score++;
    }

    res.json({ is_correct: isCorrect, correct_option: isCorrect ? undefined : question.correct_option });
});

module.exports = router;