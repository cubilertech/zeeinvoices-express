const express = require("express");
const { getAll, updateMy, getMy, create, modifyExistingDocuments } = require("../controllers/user");
const { upload } = require("../services/multer");
const authMiddleware = require("../middlewares/authentication");
const jwtVerify = require("../middlewares/jwtVerify");
const router = express.Router();

router.get("/", jwtVerify, getAll);
router.get("/my-profile", jwtVerify, getMy);
router.put("/my-profile", jwtVerify, upload.single("image"), updateMy);
router.put("/modify-existing-documents", modifyExistingDocuments);
router.post("/save", jwtVerify, create);

module.exports = router;
