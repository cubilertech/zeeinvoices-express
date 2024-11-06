const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const DOMAIN = process.env.DOMAIN;
// const mailgun = new Mailgun(formData);
// const client = mailgun.client({ username: "api", key: API_KEY });
class SendGridService {
  static sendEmail(to, subject, html = "<p>Hi</p>", text = "") {
    const messageData = {
      from: DOMAIN,
      to: to,
      subject: subject,
      html: html,
      text: text,
    };
    try {
      return sgMail.send(messageData);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
  //   static verifyEmail(email) {
  //     try {
  //       return client.validate.get(email, { provider_lookup: false });
  //     } catch (error) {
  //       console.error("Error verifying email:", error);
  //     }
  //   }
}

module.exports = SendGridService;
