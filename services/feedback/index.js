const Model = require("../../models/feedback");

class FeedbackService {
    static create(data) {
        return new Promise((resolve, reject) => {
            Model.create(data)
                .then((record) => {
                    resolve(record);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}

module.exports = FeedbackService;