const express = require("express");
const router = express.Router();
const noticeController = require("../controller/noticeController");

// Create a notice
router.post("/notices", noticeController.createNotice);

// Get all notices
router.get("/notices", noticeController.getAllNotices);

module.exports = router;
