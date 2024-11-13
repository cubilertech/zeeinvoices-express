const Service = require("../../services/user");
const { addOrUpdateOrDelete } = require("../../services/multer");
const { multerActions, multerSource } = require("../../utils/constant");
const { handleError, handleResponse } = require("../../utils/responses");
// const SendGridService = require("../../services/sendGrid");
const NodemailerService = require("../../services/nodemailer");
const { accountCreatedTemplate } = require("../../templates/email");

exports.getAll = async (req, res) => {
  try {
    const records = await Service.findAll();
    handleResponse(res, 200, "All Records", records);
  } catch (err) {
    handleError(res, err);
  }
};
exports.getMy = async (req, res) => {
  const user = req.user;
  try {
    if (!user) {
      throw new Error("Invalid user.");
    }
    const record = await Service.findBy({ email: user?.email });
    handleResponse(res, 200, "Record", record);
  } catch (err) {
    handleError(res, err);
  }
};
exports.updateMy = async (req, res) => {
  const user = req.user;
  const data = { ...req.body };
  try {
    if (!user) {
      throw new Error("Invlaid user.");
    }
    const oldRecord = await Service.findBy({ email: user?.email });
    if (req.file && req.file.fieldname === "image") {
      data.image = await addOrUpdateOrDelete(
        multerActions.PUT,
        multerSource.USERS,
        req.file.filename,
        oldRecord.image
      );
    }
    const record = await Service.update({ email: user?.email }, data);
    handleResponse(
      res,
      200,
      "Your Profile has been updated successfully",
      record
    );
  } catch (err) {
    handleError(res, err);
  }
};

exports.create = async (req, res) => {
  const data = { ...req.body };
  try {
    console.log(data.email, "data");
    const recordFound = await Service.findBy({ email: data?.email });
    console.log(recordFound, "record");
    if (!recordFound) {
      const record = await Service.create(data);
      const html = accountCreatedTemplate(record);
      // SendGridService.sendEmail(data.email, "User Created", html,"Invoice Created");
      await NodemailerService.sendEmail(
        data.email,
        "Welcome to ZeeInvoices!",
        html,
      );
      handleResponse(res, 200, "Record Created", record);
    } else {
      const currentTime = new Date();
      await Service.update({_id:recordFound?._id},{lastLogin:currentTime});
      handleResponse(res, 200, "Record Found", recordFound);
    }
  } catch (err) {
    handleError(res, err);
  }
};

exports.modifyExistingDocuments = async (req,res)=>{
   try{ 
    const currentTime = new Date();

    // Update all existing documents by setting lastLogin and lastReminderSent to the current time if they don't exist
    const result = await Service.updateMany(
      { 
         lastLogin: { $exists: false }, // Only target documents without lastLogin
         lastReminderSent: { $exists: false } // Only target documents without lastReminderSent
      },
      { 
         $set: { 
            lastLogin: currentTime,
            lastReminderSent: null 
         }
      }
   );
    handleResponse(res,200,"Records modified",result);
   }
   catch(err){
    handleError(res,err);
   }
}