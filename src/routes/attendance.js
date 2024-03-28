const express = require("express");
const { getAttendance } = require("../controller/attendance");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.route("/attendance").get(isAuthenticated,getAttendance);

module.exports = router;