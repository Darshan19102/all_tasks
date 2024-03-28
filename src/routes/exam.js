const express = require("express");
const { getExamData, getReportData } = require("../controller/exam");
const router = express.Router();

router.route("/exam").get(getExamData);
router.route("/report").get(getReportData);

module.exports = router;