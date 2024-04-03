const path = require("path");

exports.getDynamicTable = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '../../public', 'Dynamic_Table', 'dynamic_table.html'));
    } catch (error) {
        console.log(error);
    }
}

exports.getKukuCube = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '../../public', 'Kuku_Cube', 'kuku_cube.html'));
    } catch (error) {
        console.log(error);
    }
}

exports.getTicTacToe = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '../../public', 'Tic_Tac_Toe', 'tic_tac_toe.html'));
    } catch (error) {
        console.log(error);
    }
}

exports.getSorting = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '../../public', 'Sorting', 'sort.html'));
    } catch (error) {
        console.log(error);
    }
}

exports.getEvents = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '../../public', 'Events', 'events.html'));
    } catch (error) {
        console.log(error);
    }
}