const {submitFeedback} = require("../controllers/feedback/feedbackController");

const feedbackRouter = require('express').Router();

feedbackRouter.post('/submit', submitFeedback);

module.exports = feedbackRouter;