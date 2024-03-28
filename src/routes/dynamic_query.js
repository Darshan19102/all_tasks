const express = require("express");
const { getDynamicQueryOutput } = require("../controller/dynamic_query");
const router = express.Router();

router.route("/dynamic_query").get(getDynamicQueryOutput);

module.exports = router;