const path = require("path");

exports.getDynamicTable = async (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../public', 'Dynamic_Table', 'dynamic_table.html'));
}

exports.getKukuCube = async (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../public', 'Kuku_Cube', 'kuku_cube.html'));
}

exports.getTicTacToe = async (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../public', 'Tic_Tac_Toe', 'tic_tac_toe.html'));
}

exports.getSorting = async (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../public', 'Sorting', 'sort.html'));
}