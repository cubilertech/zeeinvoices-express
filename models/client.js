const mongoose = require("mongoose");
const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: "Email is required",
      match: /.+\@.+\..+/,
    },
    company_name: {
      type: String,
    },
    phone_number: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    address: {
      type: String,
    },
    lastPromotionalEmailSentOn: {
      type: Date,
      default: null,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: "User reference is required",
    },
  },
  { timestamps: true }
);

clientSchema.index({ email: 1, user_id: 1 }, { unique: true });

module.exports = mongoose.model("clients", clientSchema);
