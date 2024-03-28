const express = require("express");
const { getDynamicQueryOutput } = require("../controller/dynamic_query");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.route("/dynamic_query").get(isAuthenticated,getDynamicQueryOutput);

module.exports = router;