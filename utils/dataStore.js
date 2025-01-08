// In-memory data store for quizzes and results
const quizzes = {}; // Stores all quizzes
const results = {}; // Stores user results for each quiz

// Function to validate the structure of a quiz
function validateQuiz(quiz) {
    if (!quiz.title || !Array.isArray(quiz.questions)) return false;

    for (const question of quiz.questions) {
        if (!question.text || !Array.isArray(question.options) || typeof question.correct_option !== 'number') {
            return false;
        }
    }
    return true;
}

module.exports = { quizzes, results, validateQuiz };