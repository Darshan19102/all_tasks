const express = require("express");
const { getStudentsData } = require("../controller/student_data");
const router = express.Router();

router.route("/show_data").get(getStudentsData);

module.exports = router;