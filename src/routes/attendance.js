const express = require("express");
const { getAttendance } = require("../controller/attendance");
const router = express.Router();

router.route("/attendance").get(getAttendance);

module.exports = router;