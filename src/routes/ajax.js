const express = require("express");
const { getDropDown, getState, getCity, getPosts, getPost, getForm, getData, submitForm, getUpdateForm, updateForm } = require("../controller/ajax");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();


router.route("/").get(isAuthenticated,getForm);
router.route("/get_data").get(isAuthenticated,getData);
router.route("/submit").post(isAuthenticated,submitForm);
router.route("/update/:id").get(isAuthenticated,getUpdateForm);
router.route("/updated").post(isAuthenticated,updateForm);
router.route("/dropdown").get(isAuthenticated,getDropDown);
router.route("/state").get(isAuthenticated,getState);
router.route("/city/:state").get(isAuthenticated,getCity);
router.route("/posts").get(isAuthenticated,getPosts);
router.route("/post/:id").get(isAuthenticated,getPost);

module.exports = router;