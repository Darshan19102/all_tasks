const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { getDynamicTable, getKukuCube, getTicTacToe } = require("../controller/js_excercise");
const router = express.Router();

router.route("/dynamic_table").get(getDynamicTable);
router.route("/kuku_cube").get(getKukuCube);
router.route("/tic_tac_toe").get(getTicTacToe);

module.exports = router;