const express = require("express");
const { getStudents } = require("../controller/student");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.route("/students").get(isAuthenticated,getStudents);

module.exports = router;