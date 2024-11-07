const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const DOMAIN = process.env.DOMAIN;

class SendGridService {
  static async sendEmail(to, subject, html = "<p>Hi</p>", text = "Default Text") {
    const messageData = {
      from: DOMAIN || "muhammadwaqas3447@gmail.com", // Use environment variable for DOMAIN
      to: to,
      subject: subject,
      html: html,
      text: text,
    };

    try {
    
      await sgMail.send(messageData);; // Indicate email was sent successfully
    } catch (error) {
      console.error("Error sending email:", error);
      if (error.response) {
        console.error("SendGrid response error:", error.response.body.errors);
      }
    }
  }
}

module.exports = SendGridService;