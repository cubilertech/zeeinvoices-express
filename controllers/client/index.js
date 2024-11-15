const Service = require("../../services/client");
const UserService = require("../../services/user");
const InvoiceService = require("../../services/invoice");
const { handleError, handleResponse } = require("../../utils/responses");
const NodemailerService = require("../../services/nodemailer");
const ClientService = require("../../services/client");

exports.getAll = async (req, res) => {
  const user = req.user;
  const { page = 1, limit = 10, search = "" } = req.query; // Added search query
  const skip = (page - 1) * limit;
  try {
    const userFound = await UserService.findBy({ email: user?.email });
    if (!userFound) {
      throw new Error("Invalid user.");
    }
    const result = await Service.findAll({ user_id: userFound?._id }, search, {
      skip,
      limit: Number(limit),
    });
    handleResponse(res, 200, "All Records", result);
  } catch (err) {
    handleError(res, err);
  }
};

exports.getAllData = async (req, res) => {
  const user = req.user;
  try {
    const userFound = await UserService.findBy({ email: user?.email });
    if (!userFound) {
      throw new Error("Invalid user.");
    }
    const result = await Service.findAll({ user_id: userFound?._id });
    handleResponse(res, 200, "All Records", result);
  } catch (err) {
    handleError(res, err);
  }
};

exports.getSingle = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new Error("ID is required");
    }
    const record = await Service.findBy({ _id: id });
    handleResponse(res, 200, "Single Record", record);
  } catch (err) {
    handleError(res, err);
  }
};
exports.update = async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  try {
    const record = await Service.update({ _id: id }, data);
    handleResponse(
      res,
      200,
      "Recipients Details Has been updated successfully",
      record
    );
  } catch (err) {
    handleError(res, err);
  }
};
exports.deleteSingle = async (req, res) => {
  const { id } = req.params;
  try {

    const invoiceExists = await InvoiceService.count({ to: id });
    if (invoiceExists) {
      return handleResponse(
        res,
        400,
        "Cannot delete Recipient. It is referenced in invoices."
      );
    }

    const record = await Service.delete({ _id: id });
    handleResponse(res, 200, "Recipient deleted successfully", record);
  } catch (err) {
    handleError(res, err);
  }
};
exports.create = async (req, res) => {
  const user = req.user;
  const data = { ...req.body };
  try {
    const userFound = await UserService.findBy({ email: user?.email });
    if (!userFound) {
      throw new Error("Invalid user.");
    }
    const record = await Service.create({ ...data, user_id: userFound?._id });
    handleResponse(res, 200, "Recipient Added Successfully", record);
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Another Recipient already exists with the same email.";
    }
    handleError(res, err);
  }
};

exports.sendPromotionalEmail = async (req, res) => {
  const data = { ...req.body };

  try {
    // Find the invoice by invoiceId and clientId
    const invoice = await InvoiceService.findBy({
      _id: data?.invoiceId,
      to: data?.clientId,
    });

    if (!invoice) {
      throw new Error("Invalid invoice");
    }

    // Find the client by clientId
    const client = await ClientService.findBy({ _id: data?.clientId });
    if (!client) {
      throw new Error("Invalid client");
    }

    const currentTime = new Date();
    const lastPromotionalEmailSentOn = client?.lastPromotionalEmailSentOn;

    // Check if 14 days have passed since the last promotional email
    if (lastPromotionalEmailSentOn) {
      const daysSinceLastEmail = Math.floor(
        (currentTime - new Date(lastPromotionalEmailSentOn)) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceLastEmail <= 14) {
        return handleResponse(res, 200, "Email not sent. Last promotional email sent less than 14 days ago.");
      }
    }

    // Send the promotional email
    const html = approachingRecepientEmail(client);
    await NodemailerService.sendEmail(client?.email, "Promotional Email", html);

    // Update or insert lastPromotionalEmailSentOn to the current date
    await ClientService.update(
      { _id: client._id },
      { $set: { lastPromotionalEmailSentOn: currentTime } }
    );

    handleResponse(res, 200, "Promotional email sent successfully.");
  } catch (err) {
    handleError(res, err);
  }
};

exports.modifyExistingDocuments = async (req,res)=>{
  try{ 
   const result = await Service.updateMany(
     { 
      lastPromotionalEmailSentOn: { $exists: false },
     },
     { 
        $set: { 
          lastPromotionalEmailSentOn: null 
        }
     }
  );
   handleResponse(res,200,"Records modified",result);
  }
  catch(err){
   handleError(res,err);
  }
}