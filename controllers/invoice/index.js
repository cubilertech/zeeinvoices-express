const Service = require("../../services/invoice");
const { addOrUpdateOrDelete } = require("../../services/multer");
const UserService = require("../../services/user");
const SenderService = require("../../services/sender");
const ClientService = require("../../services/client");
const { multerActions, multerSource } = require("../../utils/constant");
const { handleError, handleResponse } = require("../../utils/responses");
const { default: mongoose } = require("mongoose");
const { incrementInvoiceId } = require("../../utils/common");
const InvoiceService = require("../../services/invoice");
const { inoviceCreatedTemplate, inoviceCreatedToFromTemplate, emailInvoiceToClient, emailInvoiceToSender } = require("../../templates/email");
// const SendGridService = require("../../services/sendGrid");
const NodemailerService = require("../../services/nodemailer");

exports.getAll = async (req, res) => {
  const user = req.user;
  const { page = 1, limit = 10, search = "" } = req.query; // Added search query
  const skip = (page - 1) * limit;
  try {
    const userFound = await UserService.findBy({ email: user?.email });
    if (!userFound) {
      throw new Error("Invalid user.");
    }
    const result = await Service.findAllWithPipeline(
      { user_id: userFound?._id },
      search,
      {
        skip,
        limit: Number(limit),
      }
    );
    const total = await Service.count({ user_id: userFound?._id });
    handleResponse(res, 200, "All Records", { ...result, total });
  } catch (err) {
    handleError(res, err);
  }
};
exports.getSingle = async (req, res) => {
  let { id } = req.params;
  try {
    if (!id) {
      throw new Error("ID is required");
    }
    // id = parseInt(id);
    const record = await Service.findByWithPipeline({ id: id });
    handleResponse(res, 200, "Single Record", record);
  } catch (err) {
    handleError(res, err);
  }
};
exports.getInvoicesByClient = async (req, res) => {
  let { id } = req.params;
  const { page = 1, limit = 10, search = "" } = req.query; // Added search query
  const skip = (page - 1) * limit;
  try {
    if (!id) {
      throw new Error("ID is required");
    }
    const records = await Service.findAllWithPipeline(
      { to: new mongoose.Types.ObjectId(id) },
      search,
      {
        skip,
        limit: Number(limit),
      }
    );
    handleResponse(res, 200, "All Records", records);
  } catch (err) {
    handleError(res, err);
  }
};
exports.getInvoicesBySender = async (req, res) => {
  let { id } = req.params;
  const { page = 1, limit = 10, search = "" } = req.query; // Added search query
  const skip = (page - 1) * limit;
  try {
    if (!id) {
      throw new Error("ID is required");
    }
    const records = await Service.findAllWithPipeline(
      { from: new mongoose.Types.ObjectId(id) },
      search,
      {
        skip,
        limit: Number(limit),
      }
    );
    handleResponse(res, 200, "All Records", records);
  } catch (err) {
    handleError(res, err);
  }
};
exports.update = async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };

  if (data?.settings) {
    data.settings = JSON.parse(data?.settings);
  }
  if (data?.items) {
    data.items = JSON.parse(data?.items);
  }
  if (data?.signature) {
    data.signature = JSON.parse(data?.signature);
  }
  try {
    const oldRecord = await Service.findBy({ _id: id });
    if (!oldRecord) {
      throw new Error("Invalid invoice id.");
    }

    if (data?.from) {
      const newFrom = JSON.parse(data?.from);
      const resp = await addOrUpdateInvoiceSenderOrReceipient(
        newFrom,
        SenderService,
        oldRecord.user_id
      );
      data.from = resp.ref;
      data.fromDetails = resp.detail;
    }
    if (data?.to) {
      const newTo = JSON.parse(data?.to);
      const resp = await addOrUpdateInvoiceSenderOrReceipient(
        newTo,
        ClientService,
        oldRecord.user_id
      );
      data.to = resp.ref;
      data.toDetails = resp.detail;
    }

    if (req.files && req.files['image'] && req.files['image'][0]) {
      data.image = await addOrUpdateOrDelete(
        multerActions.PUT,
        multerSource.INVOICES,
        req.files['image'][0].path,
        oldRecord.image
      );
    }
    if (data?.image === "no-image") {
      if (oldRecord?.image) {
        console.log("only remove image");
        await addOrUpdateOrDelete(
          multerActions.DELETE,
          multerSource.INVOICES,
          oldRecord.image
        );
      }
      data.image = "";
    }

    if (req.files && req.files['signatureImage'] && req.files['signatureImage'][0]) {
      data.signature.image = await addOrUpdateOrDelete(
        multerActions.PUT,
        multerSource.INVOICES,
        req.files['signatureImage'][0].path,
        oldRecord?.signature?.image
      );
    }
    if (data?.signatureImage === "no-image") {
      if (oldRecord?.signature?.image) {
        console.log("only remove image");
        await addOrUpdateOrDelete(
          multerActions.DELETE,
          multerSource.INVOICES,
          oldRecord?.signature?.image
        );
      }
      data.signature.image = "";
    }

    const record = await Service.update({ _id: id }, data);
    handleResponse(
      res,
      200,
      "Your Invoice has been updated successfully",
      record
    );
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Another invoice already exist with same reference.";
    }
    handleError(res, err);
  }
};
exports.deleteSingle = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await Service.delete({ id });
    if (
      record &&
      record.image &&
      record.image?.startsWith("images/invoices/uploads")
    ) {
      await addOrUpdateOrDelete(
        multerActions.DELETE,
        multerSource.INVOICES,
        record.image
      );
    }
    if(record && record.signature.image && record.signature.image?.startsWith("images/invoices/uploads")){
      await addOrUpdateOrDelete(
        multerActions.DELETE,
        multerSource.INVOICES,
        record.signature.image
      );
    }

    handleResponse(
      res,
      200,
      "Your Invoice has been deleted successfully",
      record
    );
  } catch (err) {
    handleError(res, err);
  }
};
exports.create = async (req, res) => {
  const user = req.user;
  const data = { ...req.body };
  let signature = {};
  if (data?.settings) {
    data.settings = JSON.parse(data?.settings);
  }
  if (data?.items) {
    data.items = JSON.parse(data?.items);
  }
  if(data?.designation){
    signature.designation = data.designation;
  }
  try {
    const userFound = await UserService.findBy({ email: user?.email });
    if (!userFound) {
      throw new Error("Invalid user.");
    }
    // const invoiceTotal = data.items.reduce((sum,item)=>sum+=item.subTotal,0);
    if (data?.from) {
      const newFrom = JSON.parse(data?.from);
      const resp = await addOrUpdateInvoiceSenderOrReceipient(
        newFrom,
        SenderService,
        userFound._id
      );
      data.from = resp.ref;
      data.fromDetails = resp.detail;
    }
    if (data?.to) {
      const newTo = JSON.parse(data?.to);
      const resp = await addOrUpdateInvoiceSenderOrReceipient(
        newTo,
        ClientService,
        userFound._id
      );
      data.to = resp.ref;
      data.toDetails = resp.detail;
    }

    // if (req.file && req.file.fieldname === "image") {
    //   data.image = await addOrUpdateOrDelete(
    //     multerActions.SAVE,
    //     multerSource.INVOICES,
    //     req.file.path
    //   );
    // }

    // Check if `image` file exists
    if (req.files && req.files['image'] && req.files['image'][0]) {
      data.image = await addOrUpdateOrDelete(
        multerActions.SAVE,
        multerSource.INVOICES,
        req.files['image'][0].path
      );
    }

    // Check if `signatureImage` file exists
    if (req.files && req.files['signatureImage'] && req.files['signatureImage'][0]) {
      signature.image = await addOrUpdateOrDelete(
        multerActions.SAVE,
        multerSource.INVOICES,
        req.files['signatureImage'][0].path
      );
    }   

    const record = await Service.create({ ...data,signature, user_id: userFound?._id });

      // const senderTemplate = emailInvoiceToSender(data.fromDetails);
      // await NodemailerService.sendEmail(
      //   data.fromDetails.email,
      //   "Your Invoice Has Been Created",
      //   senderTemplate,
      // );
      // const recepientTemplate = emailInvoiceToClient(data.fromDetails,data.toDetails,{id:data.id,total:invoiceTotal});
      // await NodemailerService.sendEmail(
      //   data.toDetails.email,
      //   `You've Received an Invoice from ${data.fromDetails?.name}`,
      //   recepientTemplate,
      // );

    handleResponse(
      res,
      200,
      "Your Invoice has been saved successfully",
      record
    );
  } catch (err) {
    console.log("code error",err);
    // if (err.code === 11000) {
    //   let retryCount = req.retryCount || 0;
    //   if (retryCount < 3) {  // retry limit
    //     req.retryCount = retryCount + 1;
    //     return exports.create(req, res);  // Retry by calling the same function
    //   } else {
    //     handleError(res, err);
    //   }
    // } else {
    if (err.code === 11000) {
      err.message = "Another invoice already exist with same reference.";
    }
    handleError(res, err);
    // }
  }
};

// exports.getlastRecord = async (req, res) => {
//   try {
//     let newId = 1;
//     const record = await Service.lastRecord();
//     if (record) {
//       newId = record.id + 1;
//     }
//     handleResponse(res, 200, "Latest Id", newId);
//   } catch (err) {
//     handleError(res, err);
//   }
// };

exports.getNewInvoiceId = async (req, res) => {
  const user = req?.user;
  try {
    const userFound = await UserService.findBy({ email: user?.email });
    if (!userFound) {
      throw new Error("Invalid user.");
    }
    const invoicesExist = await InvoiceService.findAll({
      user_id: userFound?._id,
    });
    if (invoicesExist?.length > 0) {
      const newInvoiceId = await generateUniqueInvoiceId(
        invoicesExist[0]?.id,
        userFound?._id
      );
      return handleResponse(res, 200, "Invoice ID", newInvoiceId);
    }
    handleResponse(res, 200, "Invoice ID", "AB0001");
  } catch (err) {
    handleError(res, err);
  }
};

async function generateUniqueInvoiceId(existingInvoiceId, user_id) {
  let newInvoiceId = incrementInvoiceId(existingInvoiceId);
  let isUnique = false;
  // Continue incrementing and checking uniqueness until a unique ID is found
  while (!isUnique) {
    const invoiceExists = await InvoiceService.exist({
      id: newInvoiceId,
      user_id: user_id,
    });
    if (!invoiceExists) {
      isUnique = true;
    } else {
      // If the ID already exists, increment again
      newInvoiceId = incrementInvoiceId(newInvoiceId);
    }
  }
  return newInvoiceId;
}

const addOrUpdateInvoiceSenderOrReceipient = async (data, Service, userId) => {
  let resp = {}; // Initialize as an empty object
  try {
    const recordFound = await Service.findBy({
      email: data.email,
      user_id: userId, // Use userId here to ensure correct user scope
    });
    if (recordFound) {
      const { email } = recordFound;
      const dataDetail = { ...data, email }; // Spread in data and override with existing email
      resp.ref = recordFound._id;
      resp.detail = dataDetail;
    } else {
      const newData = { ...data, user_id: userId };
      const recordCreated = await Service.create(newData);
      resp.ref = recordCreated._id;
      resp.detail = { ...data };
    }
    return resp;
  } catch (err) {
    throw new Error(`Failed to add or update sender/recipient: ${err.message}`);
  }
};

// exports.sendEmailInvoice = async (req, res) => {
//   // const user = req.user;
//   try {
//     const html = inoviceCreatedTemplate();
//     await SendGridService.sendEmail(
//       "eng.mirza.rehman@gmail.com",
//       "Invoice Created",
//       html,
//       "Invoice Created"
//     );

//     handleResponse(res, 200, "Invoice ID", "AB0001");
//   } catch (err) {
//     handleError(res, err);
//   }
// };

exports.modifyExistingDocuments = async (req,res)=>{
  try{ 
   const result = await Service.updateMany(
     { 
      signature: { $exists: false },
     },
     { 
        $set: { 
           signature: null 
        }
     }
  );
   handleResponse(res,200,"Records modified",result);
  }
  catch(err){
   handleError(res,err);
  }
}