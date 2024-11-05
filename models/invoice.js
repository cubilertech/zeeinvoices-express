const mongoose = require("mongoose");
const { invoiceStatus } = require("../utils/constant");
const invoiceSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: "Invoice id is required",
      // unique: true,
    },
    image: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      required: "Invoice type is required",
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "senders",
      required: "Sender field is required",
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clients",  // Defining relation with Sender document
      required: "Client field is required",
    },
    fromDetails: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    toDetails:{
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    invoiceDate: {
      type: String,
      requried: "Invoice date is required",
    },
    dueDate: {
      type: String,
    },
    items: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ],
    settings: {
      type: mongoose.Schema.Types.Mixed,
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      default: invoiceStatus.PENDING,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: "User reference is required",
    },
  },
  { timestamps: true }
);
invoiceSchema.index({ id: 1, user_id: 1 }, { unique: true });
module.exports = mongoose.model("invoices", invoiceSchema);
