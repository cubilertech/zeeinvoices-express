const cron = require("node-cron");
const UserService = require("../services/user");
// const SendGridService = require("../services/sendGrid");
const { accountInactiveTemplate } = require("../templates/email");
const NodemailerService = require("../services/nodemailer");

// // Task to run every 5 minutes
// cron.schedule('*/2 * * * *', async () => {
//     const date = new Date();
//     console.log('Running task every 2 minutes',date.toLocaleTimeString());
//     try {
//         // const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
//         // const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
//         const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000); 
//         console.log(fiveMinutesAgo,'ssss');
//         // Find users who haven't logged in for over 30 days
//         const inactiveUsers = await UserService.findAll({
//             lastLogin: { $lt: fiveMinutesAgo },
//                     $or: [
//                         // { lastReminderSent: { $exists: false } },
//                         { lastReminderSent: null }, // lastReminderSent is explicitly null
//                         { lastReminderSent: { $lt: fiveMinutesAgo } },
//                     ],
//         });

//         // Send reminder emails
//         inactiveUsers.forEach(async (user) => {
//             const html = accountInactiveTemplate(user);
//             // SendGridService.sendEmail(user.email, "Account inacitivity reminder", html, "Account Inactivity");
//             await NodemailerService.sendEmail(
//                 user.email,
//                 "We Miss You! Come Back to ZeeInvoices",
//                 html,
//               );
//                 // Update lastReminderSent to current time
//                 await UserService.update({_id:user._id}, { lastReminderSent: new Date() });
//         });

//         console.log(`Sent reminders to ${inactiveUsers.length} inactive users.`);
//     } catch (error) {
//         console.error('Error in sending reminder emails:', error);
//     }
// });

// Task to run every 1 hour
cron.schedule("0 * * * *", async () => {
  console.log("Running task every 1 hour");
  // Your task logic here
  try {
    // const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago

    // Find users who haven't logged in for over 30 days
    const inactiveUsers = await UserService.findAll({
        lastLogin: { $lt: thirtyDaysAgo },
        $or: [
            // { lastReminderSent: { $exists: false } },
            { lastReminderSent: null }, // lastReminderSent is explicitly null
            { lastReminderSent: { $lt: thirtyDaysAgo } },
        ],
    });

    // Send reminder emails
    inactiveUsers.forEach(async (user) => {
      const html = accountInactiveTemplate(user);
      // SendGridService.sendEmail(user.email, "Account inacitivity reminder", html, "Account Inactivity");
      await NodemailerService.sendEmail(
        user.email,
        "We Miss You! Come Back to ZeeInvoices",
        html
      );
        // Update lastReminderSent to current time
        await UserService.update({_id:user._id}, { lastReminderSent: new Date() });
    });

    console.log(`Sent reminders to ${inactiveUsers.length} inactive users.`);
  } catch (error) {
    console.error("Error in sending reminder emails:", error);
  }
});
