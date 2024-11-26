const cron = require("node-cron");
const UserService = require("../services/user");
const { accountInactiveTemplate } = require("../templates/email");
const NodemailerService = require("../services/nodemailer");

// Delay function for rate limiting
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Maximum retry attempts
const MAX_RETRIES = 3;

// Task to run every 1 hour
cron.schedule("0 * * * *", async () => {
  console.log("Running task every 1 hour");
  try {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

    const inactiveUsers = await UserService.findAll({
      lastLogin: { $lt: twoDaysAgo },
      $or: [
        { lastReminderSent: null },
        { lastReminderSent: { $lt: twoDaysAgo } },
      ],
    });

    console.log(`Found ${inactiveUsers.length} inactive users to notify.`);

    for (let i = 0; i < inactiveUsers.length; i++) {
      const user = inactiveUsers[i];
      const html = accountInactiveTemplate(user);
      let attempts = 0;

      while (attempts < MAX_RETRIES) {
        try {
          // Send email
          await NodemailerService.sendEmail(
            user.email,
            "We Miss You! Come Back to ZeeInvoices",
            html
          );

          // Update lastReminderSent to current time
          await UserService.update(
            { _id: user._id },
            { lastReminderSent: new Date() }
          );

          console.log(`Email sent to ${user.email}`);
          break; // Exit retry loop on success
        } catch (error) {
          attempts++;
          console.error(
            `Error sending email to ${user.email} (attempt ${attempts}):`,
            error.message
          );

          // If max retries reached, log and move to the next user
          if (attempts >= MAX_RETRIES) {
            console.error(
              `Failed to send email to ${user.email} after ${MAX_RETRIES} attempts.`
            );
          } else {
            // Wait before retrying
            await delay(5000); // 5-second delay between retries
          }
        }
      }

      // Delay between sending emails to avoid overloading SMTP
      await delay(2000); // 2-second delay
    }
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});
