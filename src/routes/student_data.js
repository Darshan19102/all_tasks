const express = require("express");
const { getStudentsData } = require("../controller/student_data");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.route("/show_data").get(isAuthenticated,getStudentsData);

module.exports = router;