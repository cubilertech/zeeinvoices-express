const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
dotenv.config();
require("./configs/db");
require("./configs/cronjob");
const app = express();
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const invoiceRouter = require("./routes/invoice");
const clientRouter = require("./routes/client");
const senderRouter = require("./routes/sender");
const authRouter = require("./routes/oauth");

const port = process.env.PORT || 3005;
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/invoices", invoiceRouter);
app.use("/clients", clientRouter);
app.use("/senders", senderRouter);
app.use("/users", userRouter);
app.use("/", indexRouter);
app.use("/oauth", authRouter);
app.use("/auth", authRouter)

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
