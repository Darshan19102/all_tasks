const express = require("express");
const { getDropDown, getState, getCity, getPosts, getPost } = require("../controller/ajax");
const router = express.Router();

router.route("/dropdown").get(getDropDown);
router.route("/state").get(getState);
router.route("/city/:state").get(getCity);
router.route("/posts").get(getPosts)
router.route("/post/:id").get(getPost);

module.exports = router;