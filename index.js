const express = require('express');
const bodyParser = require('body-parser');
const createQuizRouter = require('./api/createQuiz/createQuiz');
const getQuizRouter = require('./api/getQuiz/getQuiz');
const submitAnswerRouter = require('./api/submitAnswer/submitAnswer');
const getResultsRouter = require('./api/getResults/getResults');

const app = express();
app.use(bodyParser.json());
app.use(createQuizRouter);
app.use(getQuizRouter);
app.use(submitAnswerRouter);
app.use(getResultsRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
