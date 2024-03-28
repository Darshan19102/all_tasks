const express = require("express");
const { getDelimeter } = require("../controller/delimeter");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.route("/delimeter").get(isAuthenticated,getDelimeter);

module.exports = router;