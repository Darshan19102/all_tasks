const express = require("express");
const { getDropDown, getState, getCity, getPosts, getPost, getForm, getData, submitForm, getUpdateForm, updateForm } = require("../controller/ajax");
const router = express.Router();


router.route("/").get(getForm);
router.route("/get_data").get(getData);
router.route("/submit").post(submitForm);
router.route("/update/:id").get(getUpdateForm);
router.route("/updated").post(updateForm);
router.route("/dropdown").get(getDropDown);
router.route("/state").get(getState);
router.route("/city/:state").get(getCity);
router.route("/posts").get(getPosts)
router.route("/post/:id").get(getPost);

module.exports = router;