const request = require('supertest');
const app = require('../../index');
const { results } = require('../../utils/dataStore');

// Tests for Get Results API
describe('Get Results API', () => {
    beforeEach(() => {
        // Setup initial data for testing
        results['quiz1'] = {
            user1: {
                score: 1,
                answers: [
                    { question_id: 'q1', selected_option: 3, is_correct: true },
                ],
            },
        };
    });

    afterEach(() => {
        // Clean up data after each test
        delete results['quiz1'];
    });

    it('should fetch quiz results', async () => {
        const response = await request(app).get('/quiz/quiz1/results/user1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('score', 1);
    });

    it('should return 404 for non-existent results', async () => {
        const response = await request(app).get('/quiz/quiz1/results/user2');
        expect(response.status).toBe(404);
    });
});