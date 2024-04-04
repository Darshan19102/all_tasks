const db = require("../config/connection");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

exports.getSignUp = async (req, res, next) => {
    try {
        if (req.cookies.token) res.render("home");
        else res.render("signup");
    } catch (error) {
        console.log(error);
    }
}

exports.postSignUp = async (req, res, next) => {
    try {

        const { fname, lname, email } = req.body;

        const isUserExist = await db.promise().query('select * from users where email = ?', [email]);

        if (isUserExist[0].length !== 0) return res.json({ msg: "Invalid email" });

        const characters = 'ABCDEFGHIJKLMNO0123456789PQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

        const charactersLength = characters.length;

        let counter = 0;

        let salt = "";

        let access_key = "";

        while (counter <= 12) {
            salt += characters.charAt(Math.floor(Math.random() * charactersLength));
            access_key += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }

        salt = salt.slice(0, 4);

        const response = await db.promise().query('insert into users (`first_name`,`last_name`,`email`,`salt`,`access_key`) values (?,?,?,?,?)', [fname, lname, email, salt, access_key]);

        res.json({ id: response[0].insertId, access_key, salt });

    } catch (error) {
        console.log(error);
    }
}

exports.getSignIn = async (req, res, next) => {
    try {
        if (req.cookies.token) res.render("home");
        else res.render("signin");
    } catch (error) {
        console.log(error);
    }
}

exports.postSignIn = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        const isUserExist = await db.promise().query('select * from users where email = ?', [email]);

        if (isUserExist[0].length === 0) return res.json({ msg: "Invalid email or password", msg_2: "" });

        const user = isUserExist[0][0];

        const id = user.id;

        const d_password = md5(password + user.salt);

        if (user.password !== d_password) return res.json({ msg: "Invalid email or password", msg_2: "" });

        const token = jwt.sign({ id }, process.env.SECRETKEY, { expiresIn: '1h' });

        res.cookie('token', token, { expires: new Date(Date.now() + 3600000), httpOnly: true });

        return res.json({ msg: "Login Successfully", token: token, msg_2: "Click here to <a href=http://localhost:7500/home>Go to Dashboard</a>" });

    } catch (error) {

        console.log(error);

    }
}

exports.getPassword = async (req, res, next) => {
    try {

        const { id, access_key, salt } = req.query;

        var isValid = true;

        const data = await db.promise().query('select * from users where id = ?', [id]);

        if (access_key !== data[0][0].access_key) isValid = false;

        var diff = new Date().valueOf() - data[0][0].created_at.valueOf();

        let hours = Math.floor(diff / (1000 * 60 * 60));

        res.render("password", { id, access_key, hours, salt, isValid });

    } catch (error) {
        console.log(error);
    }
}

exports.postPassword = async (req, res, next) => {
    try {

        const { id, salt, password, r_password } = req.body;

        if (password === r_password) {
            const hashed = md5(password + salt);
            await db.promise().query('update users set password = ?,created_at=now() where id=?', [hashed, id]);
            res.json({ status: 200, msg: "Account activated successfully" });
        } else {
            res.json({ status: 400, msg: "Please enter same password" });
        }

    } catch (error) {
        console.log(error);
    }
}

exports.getForget = async (req, res, next) => {
    try {
        res.render("email");
    } catch (error) {
        console.log(error);
    }
}

exports.postForget = async (req, res, next) => {
    try {

        const { email } = req.body;

        const isUserExist = await db.promise().query('select * from users where email = ?', [email]);

        if (isUserExist[0].length === 0) return res.json({ msg: "Invalid email or password" });

        const user = isUserExist[0][0];

        return res.json({ link: `http://localhost:7500/password/?id=${user.id}&access_key=${user.access_key}&salt=${user.salt}` });

    } catch (error) {

        console.log(error);

    }
}

exports.generateToken = async (req, res, next) => {
    try {

        const { access_key } = req.query;

        const isUserExist = await db.promise().query('select * from users where access_key = ?', [access_key]);

        if (isUserExist[0].length === 0) return res.send("Token not valid");

        let updated_access_key = "";

        const characters = 'ABCDEFGHIJKLMNO0123456789PQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

        const charactersLength = characters.length;

        let counter = 0;

        while (counter <= 12) {
            updated_access_key += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }

        const update_data = await db.promise().query('update users set access_key = ?,created_at=now() where access_key = ?', [updated_access_key, access_key]);

        res.send(`<h3 style="color:blue; text-align:center;">Token generated sucessfully :: ${updated_access_key}</h3><br/><a style="color:blue; text-align:center;" href="http://localhost:7500/password/?id=${isUserExist[0][0].id}&access_key=${updated_access_key}&salt=${isUserExist[0][0].salt}">Click here to change password</a>`);

    } catch (error) {

        console.log(error);

    }
}

exports.logout = async (req, res, next) => {
    try {
        res.clearCookie('token');
        res.redirect("/sign_in");
    } catch (error) {
        console.log(error);
    }
}

exports.getDashboard = async (req, res, next) => {
    try {
        res.render("home");
    } catch (error) {
        console.log(error);
    }
}