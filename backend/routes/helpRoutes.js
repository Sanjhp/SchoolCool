const express = require("express");
const router = express.Router();
const helpController = require("../controller/helpController");

// Create a notice
router.post("/help", helpController.help);
router.patch("/help/:id", helpController.updateHelpReply);
router.get("/closedQuery/:schoolId", helpController.closedQuery);
router.get("/open/:queryClass", helpController.openQuery);

module.exports = router;
