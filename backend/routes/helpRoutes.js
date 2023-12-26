const express = require("express");
const router = express.Router();
const helpController = require("../controller/helpController");

// Create a notice
router.post("/help", helpController.help);
router.patch("/help/:id", helpController.updateHelpReply);
router.get("/closedQuery/:schoolId", helpController.closedQuery);
router.patch("/open", helpController.openQuery);

module.exports = router;
