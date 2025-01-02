const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  }
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
