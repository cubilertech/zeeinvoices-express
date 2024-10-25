const mongoose = require("mongoose");
const Invoice = require("../models/invoice"); // Import your model
const Client = require("../models/client"); // Import your model
const Sender = require("../models/sender"); // Import your model
mongoose
  .connect(process.env.MONGODB_ATLAS_URI, {})
  .then(async () => {
    console.log("Database Connected.");
    // Ensure indexes after connection
    try {
      await Invoice.syncIndexes();
      await Client.syncIndexes();
      await Sender.syncIndexes();
      console.log("Indexes synchronized.");
    } catch (err) {
      console.error("Error synchronizing indexes:", err);
    }
  })
  .catch((err) => {
    console.log("Error connecting to Database.", err);
  });
