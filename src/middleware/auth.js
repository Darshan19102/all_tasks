const db = require("../config/connection");

exports.isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) return res.send(`<body style="background-color:darkslategray"><h1 style="text-align:center; margin-top:200px;">You are not logged in!! <a href="/sign_in">Login</a></h1></body>`);
        else next();
    } catch (error) {
        console.log(error);
    }
}