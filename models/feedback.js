const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    rating: {
        type: String,
        required: 'Rating is required',
        allowNull: false
    },
    feedback: {
        type: String,
        allowNull: true
    },
    email: {
        type: String,
        allowNull: false,
        required: 'Email is Required'
    }
},{
    timestamps: true
});

const Feedback = mongoose.model('feedback', feedbackSchema);

module.exports = Feedback;