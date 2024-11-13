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
  modifyExistingDocuments,
  // sendEmailInvoice,
} = require("../controllers/invoice");
const { upload } = require("../services/multer");
const authMiddleware = require("../middlewares/authentication");
const router = express.Router();

router.get("/", authMiddleware, getAll);
router.get("/last-record", authMiddleware, getNewInvoiceId);
router.get("/by-client/:id", authMiddleware, getInvoicesByClient);
router.get("/by-sender/:id", authMiddleware, getInvoicesBySender);
router.get("/:id", getSingle);
router.put("/modify-existing-documents", modifyExistingDocuments);
router.put("/:id", authMiddleware, upload.single("image"), update);
router.delete("/:id", authMiddleware, deleteSingle);
router.post("/save", authMiddleware, upload.fields([
  { name: "image", maxCount: 1 },
  { name: "signatureImage", maxCount: 1 },
]), create);
// router.post("/email", sendEmailInvoice);

module.exports = router;
