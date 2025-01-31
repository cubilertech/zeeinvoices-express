const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_APP_PASSWORD,
  },
  requireTLS: true,
});

class NodemailerService {
  static sendEmail(to, subject, html = "<p>Hi</p>", text = "", from = "Developer") {
    const messageData = {
      from: `zeeinvoiceswebsite <Info@ZeeInvoices.com>`,
      to: to,
      subject: subject,
      html: html,
      text: text,
    };
    try {
      return transporter.sendMail(messageData);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}

module.exports = NodemailerService;
