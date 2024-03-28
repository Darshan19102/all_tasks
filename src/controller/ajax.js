const db = require("../config/connection");
const path = require("path");

exports.getDropDown = async (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../public', 'State_City', 'state_city.html'));
}

exports.getState = async(req,res,next)=>{
    try {
        const data = await db.promise().query('select * from states');
        const states = data[0];
        res.send(states);
    } catch (error) {
        console.log(error);
    }
}

exports.getCity = async(req,res,next)=>{
    try {
        const data = await db.promise().query('select * from cities where state_id = ?', [req.params.state]);
        const cities = data[0];
        res.send(cities);
    } catch (error) {
        console.log(error);
    }
}

exports.getPosts = async(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../../public','Jsonplaceholder','index.html'));
}

exports.getPost = async(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../../public','Jsonplaceholder','single_data.html'));
}