const mongoose = require("mongoose");
const senderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required",
      minlength: [3, "Name must be atleast 3 character long"],
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
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: "User reference is required",
    },
  },
  { timestamps: true }
);

senderSchema.index({ email: 1, user_id: 1 }, { unique: true });
module.exports = mongoose.model("senders", senderSchema);
