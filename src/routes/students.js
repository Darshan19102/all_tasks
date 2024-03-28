const express = require("express");
const { getStudents } = require("../controller/student");
const router = express.Router();

router.route("/students").get(getStudents);

module.exports = router;