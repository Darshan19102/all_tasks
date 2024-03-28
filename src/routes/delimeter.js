const express = require("express");
const { getDelimeter } = require("../controller/delimeter");
const router = express.Router();

router.route("/delimeter").get(getDelimeter);

module.exports = router;