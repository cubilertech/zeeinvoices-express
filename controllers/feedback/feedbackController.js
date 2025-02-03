const Service = require("../../services/feedback/index");

exports.submitFeedback = async (req, res) => {
    try {
        const {rating, feedback, email} = req.body;
        if (!rating || rating === '') {
            return res.status(400).json({error: true, message: 'Rating is required'});
        }

        if (!feedback || feedback === '') {
            return res.status(400).json({error: true, message: 'Feedback is required'});
        }

        const feedbackRecord = await Service.create({rating, feedback, email: email ? email : null});

        console.log("Feedback record", feedbackRecord);

        if (feedbackRecord) {
            res.status(200).json({error: false, message: "Feedback submitted successfully"});
        } else {
            res.status(500).json({error: true, message: "Failed to submit feedback"});
        }
    } catch (err) {
        console.log("Error", err);
        res.status(500).json({error: true, message: "Server Error"});
    }
}