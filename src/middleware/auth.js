const db = require("../config/connection");

exports.isAuthenticated = async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token) return res.send("Not");
    next();
}