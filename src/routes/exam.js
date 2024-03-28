const express = require("express");
const { getExamData, getReportData } = require("../controller/exam");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.route("/exam").get(isAuthenticated,getExamData);
router.route("/report").get(isAuthenticated,getReportData);

module.exports = router;