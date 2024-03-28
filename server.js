const connect = require("./src/config/connection");
require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const login = require("./src/routes/authentication");
const js_excercise = require("./src/routes/js_excercise");
const student_data = require("./src/routes/student_data");
const delimeter = require("./src/routes/delimeter");
const attendance = require("./src/routes/attendance");
const exam = require("./src/routes/exam");
const students = require("./src/routes/students");
const dq = require("./src/routes/dynamic_query");
const ajax = require("./src/routes/ajax");
const path = require("path");
const cors = require("cors");


app.set('view engine', 'ejs');

app.use(cors())
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", login);
app.use("/", student_data);
app.use("/", delimeter);
app.use("/", attendance);
app.use("/", exam);
app.use("/", students);
app.use("/", dq);
app.use("/ajax", ajax);
app.use("/task", js_excercise);
app.use(express.static(path.join(__dirname,'public','Job_Application')))

app.listen(7500, () => {
    console.log("http://localhost:7500/");
})