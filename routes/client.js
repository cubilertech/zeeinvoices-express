const express = require("express");
const {
  getAll,
  update,
  getSingle,
  deleteSingle,
  create,
  getAllData,
  sendPromotionalEmail,
  modifyExistingDocuments
} = require("../controllers/client");
const authMiddleware = require("../middlewares/authentication");
const jwtVerify = require("../middlewares/jwtVerify");
const router = express.Router();

router.get("/", jwtVerify, getAll);
router.get("/getAll", jwtVerify, getAllData);
router.get("/:id", jwtVerify, getSingle);
router.put("/modify-existing-documents", modifyExistingDocuments);
router.put("/:id", jwtVerify, update);
router.delete("/:id", jwtVerify, deleteSingle);
router.post("/send-promotional-email",sendPromotionalEmail);
router.post("/save", jwtVerify, create);

module.exports = router;
