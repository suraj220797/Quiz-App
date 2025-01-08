const request = require('supertest');
const app = require('../../index');
const { quizzes } = require('../../utils/dataStore');

// Tests for Get Quiz API
describe('Get Quiz API', () => {
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
    });

    it('should fetch a quiz successfully', async () => {
        const response = await request(app).get('/quiz/quiz1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 'quiz1');
    });

    it('should return 404 for non-existent quiz', async () => {
        const response = await request(app).get('/quiz/invalid');
        expect(response.status).toBe(404);
    });
});