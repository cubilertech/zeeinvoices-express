const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    rating: {
        type: String,
        required: 'Rating is required',
        allowNull: false
    },
    feedback: {
        type: String,
        required: 'Feedback is required',
        allowNull: false
    },
    email: {
        type: String,
        allowNull: true
    }
},{
    timestamps: true
});

const Feedback = mongoose.model('feedback', feedbackSchema);

module.exports = Feedback;