const express = require("express");
const { getDropDown, getState, getCity } = require("../controller/ajax");
const router = express.Router();

router.route("/dropdown").get(getDropDown);
router.route("/state").get(getState);
router.route("/city/:state").get(getCity);

module.exports = router;