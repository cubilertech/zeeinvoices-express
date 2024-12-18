const Service = require("../../services/sender");
const UserService = require("../../services/user");
const InvoiceService = require("../../services/invoice");
const { handleError, handleResponse } = require("../../utils/responses");

exports.getAll = async (req, res) => {
  const user = req.user;
  const { page = 1, limit = 10, search = "" } = req.query; // Added search query
  const skip = (page - 1) * limit;
  try {
    const userFound = await UserService.findBy({ email: user?.email });
    if (!userFound) {
      throw new Error("Invalid Loggedin user.");
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
      throw new Error("Invalid Loggedin user.");
    }
    const result = await Service.findAll({ user_id: userFound?._id });
    handleResponse(res, 200, "All Records", result);
  } catch (err) {
    handleError(res, err);
  }
};
exports.getSingle = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  try {
    const userFound = await UserService.findBy({ email: user?.email });
    if (!userFound) {
      throw new Error("Invalid Loggedin user.");
    }

    if (!id) {
      throw new Error("ID is required");
    }
    const record = await Service.findBy({ _id: id , user_id: userFound?._id });
    handleResponse(res, 200, "Single Record", record);
  } catch (err) {
    handleError(res, err);
  }
};
exports.update = async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  const user = req.user;
  try {
    const userFound = await UserService.findBy({ email: user?.email });
    if (!userFound) {
      throw new Error("Invalid Loggedin user.");
    }

    if(data?.email){
      delete data.email;
    }
    if(data?.user_id){
      delete data.user_id;
    }
    const record = await Service.update({ _id: id , user_id: userFound?._id }, data);
    handleResponse(res, 200, "Sender Details Has been updated successfully", record);
  } catch (err) {
    handleError(res, err);
  }
};
exports.deleteSingle = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  try {
    const userFound = await UserService.findBy({ email: user?.email });
    if (!userFound) {
      throw new Error("Invalid Loggedin user.");
    }
    
    const invoiceExists = await InvoiceService.count({ from: id });
    if (invoiceExists) {
      return handleResponse(res, 400, "Cannot delete sender. It is referenced in invoices.");
    }
    
    const record = await Service.delete({ _id: id , user_id: userFound?._id });
    handleResponse(res, 200, "Sender deleted successfully", record);
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
      throw new Error("Invalid Loggedin user.");
    }
    const record = await Service.create({ ...data, user_id: userFound?._id });
    handleResponse(res, 200, "Sender Added Successfully", record);
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Another sender already exists with the same email.";
    }
    handleError(res, err);
  }
};
