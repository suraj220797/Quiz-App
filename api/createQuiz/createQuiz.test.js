const request = require('supertest');
const app = require('../../index');
const { quizzes } = require('../../utils/dataStore');

// Tests for Create Quiz API
describe('Create Quiz API', () => {
    afterEach(() => {
        // Clean up data after each test
        for (const key in quizzes) delete quizzes[key];
    });

    it('should create a quiz successfully', async () => {
        const quizData = {
            title: 'Sample Quiz',
            questions: [
                { id: 'q1', text: 'What is 2 + 2?', options: ['1', '2', '3', '4'], correct_option: 3 },
            ],
        };

        const response = await request(app).post('/quiz').send(quizData);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    it('should return error for invalid quiz structure', async () => {
        const response = await request(app).post('/quiz').send({ title: 'Invalid Quiz' });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});
