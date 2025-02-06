const Service = require("../../services/feedback/index");
const {feedbackEmail} = require("../../templates/email");
const NodemailerService = require("../../services/nodemailer");

exports.submitFeedback = async (req, res) => {
    try {
        const {rating, feedback, email} = req.body;
        if (!rating || rating === '') {
            return res.status(400).json({error: true, message: 'Rating is required'});
        }

        if (!email || email === '') {
            return res.status(400).json({error: true, message: 'Feedback is required'});
        }

        const feedbackRecord = await Service.create({rating, feedback, email: email ? email : null});

        const html = feedbackEmail(rating, feedback);

        await NodemailerService.sendEmail(
            "support@zeeinvoices.com",
            "User Feedback!",
            html,
            "",
            email
        );

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