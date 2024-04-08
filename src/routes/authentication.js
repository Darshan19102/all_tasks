const express = require("express");
const { getSignUp, postSignUp, getSignIn, postSignIn, getPassword, postPassword, getForget, postForget, generateToken, logout, getDashboard } = require("../controller/authentication");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.route("/").get(getSignUp);
router.route("/sign_up").post(postSignUp);
router.route("/sign_in").get(getSignIn).post(postSignIn);
router.route("/password").get(getPassword).post(postPassword);
router.route("/forget").get(getForget).post(postForget);
router.route("/generateToken").get(generateToken);
router.route("/logout").get(logout);
router.route("/home").get(isAuthenticated,getDashboard);

module.exports = router;