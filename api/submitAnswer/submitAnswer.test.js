const request = require('supertest');
const app = require('../../index');
const { quizzes, results } = require('../../utils/dataStore');

// Tests for Submit Answer API
describe('Submit Answer API', () => {
    beforeEach(() => {
        // Setup initial data for testing
        quizzes['quiz1'] = {
            id: 'quiz1',
            title: 'Sample Quiz',
            questions: [
                { id: 'q1', text: 'What is 2 + 2?', options: ['1', '2', '3', '4'], correct_option: 3 },
            ],
        };
    });

    afterEach(() => {
        // Clean up data after each test
        delete quizzes['quiz1'];
        delete results['quiz1'];
    });

    it('should submit a correct answer', async () => {
        const response = await request(app)
            .post('/quiz/quiz1/answer')
            .send({ question_id: 'q1', selected_option: 3, user_id: 'user1' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('is_correct', true);
    });

    it('should return 404 for non-existent question', async () => {
        const response = await request(app)
            .post('/quiz/quiz1/answer')
            .send({ question_id: 'q2', selected_option: 3, user_id: 'user1' });

        expect(response.status).toBe(404);
    });
});
