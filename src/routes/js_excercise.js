const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { getDynamicTable, getKukuCube, getTicTacToe, getSorting } = require("../controller/js_excercise");
const router = express.Router();

router.route("/dynamic_table").get(getDynamicTable);
router.route("/kuku_cube").get(getKukuCube);
router.route("/tic_tac_toe").get(getTicTacToe);
router.route("/sort").get(getSorting);

module.exports = router;