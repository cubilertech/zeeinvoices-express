const express = require("express");
const {
  getAll,
  update,
  getSingle,
  deleteSingle,
  create,
  getNewInvoiceId,
  getInvoicesByClient,
  getInvoicesBySender,
  modifyExistingDocuments, changeStatus, duplicateInvoice,
  // sendEmailInvoice,
} = require("../controllers/invoice");
const { upload } = require("../services/multer");
const authMiddleware = require("../middlewares/authentication");
const jwtVerify = require("../middlewares/jwtVerify");
const router = express.Router();

router.get("/", jwtVerify, getAll);
router.get("/last-record", jwtVerify, getNewInvoiceId);
router.get("/by-client/:id", jwtVerify, getInvoicesByClient);
router.get("/by-sender/:id", jwtVerify, getInvoicesBySender);
router.get("/:id", getSingle);
router.put("/modify-existing-documents", modifyExistingDocuments);
router.put("/:id", jwtVerify, upload.fields([
  { name: "image", maxCount: 1 },
  { name: "signatureImage", maxCount: 1 },
]), update);
router.delete("/:id", jwtVerify, deleteSingle);
router.post("/save", jwtVerify, upload.fields([
  { name: "image", maxCount: 1 },
  { name: "signatureImage", maxCount: 1 },
]), create);
router.post("/update-status/:id", jwtVerify, changeStatus);
router.get("/duplicate/:id", jwtVerify, duplicateInvoice);
// router.post("/email", sendEmailInvoice);

module.exports = router;
