const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { getDynamicTable, getKukuCube, getTicTacToe, getSorting, getEvents } = require("../controller/js_excercise");
const router = express.Router();

router.route("/dynamic_table").get(isAuthenticated,getDynamicTable);
router.route("/kuku_cube").get(isAuthenticated,getKukuCube);
router.route("/tic_tac_toe").get(isAuthenticated,getTicTacToe);
router.route("/sort").get(isAuthenticated,getSorting);
router.route("/events").get(isAuthenticated,getEvents);

module.exports = router;