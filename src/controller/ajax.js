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

exports.getForm = async(req,res,next)=>{
    const hindi = [], english = [], gujarati = [];
    const php = [], mysql = [], laravel = [], oracle = [];
    const user = {}, education = [{}], reference = [{}], experience = [{}];
    res.render('index',{ user, education, reference, experience, hindi, english, gujarati, php, mysql, laravel, oracle });
}

exports.getData = async(req,res,next)=>{
    const userData = await db.promise().query('SELECT * FROM employee_master');
    const result = userData[0];
    res.render('data', { result });
}

exports.submitForm = async(req,res,next)=>{
    try {
        var { fname, lname, designation, address_1, email, address_2, phone, city, gender, state, relation, zip, DOB } = req.body;
        var { board, passing, per } = req.body;
        // console.log(req.body);
        var { location, department, notice, expected, current } = req.body;
        var { h_id, hindi, r_h, w_h, s_h, e_id, english, r_e, w_e, s_e, g_id, gujarati, r_g, w_g, s_g } = req.body;
        var { php, php_tech, mysql, mysql_tech, laravel, laravel_tech, oracle, oracle_tech } = req.body;
        var { ref_1, contact_1, relation_1 } = req.body;
        var { com_1, designation_1, to_1, from_1 } = req.body;

        var employee_id = 0;

        const sql1 = 'select o.id , s.select_name , o.option_name from option_master as o inner join select_master as s where o.s_id = s.id';

        const select_option = await db.promise().query(sql1);

        select_option[0].map((s) => {
            if (s.option_name === 'Male' && gender === 'male') gender = s.id;
            if (s.option_name === 'Female' && gender === 'female') gender = s.id;
            if (s.option_name === 'Single' && relation === 'single') relation = s.id;
            if (s.option_name === 'Married' && relation === 'married') relation = s.id;
            if (s.option_name === 'Hindi' && hindi === 'on') hindi = s.id;
            if (s.option_name === 'English' && english === 'on') english = s.id;
            if (s.option_name === 'Gujarati' && gujarati === 'on') gujarati = s.id;
            if (s.option_name === 'PHP' && php === 'on') php = s.id;
            if (s.option_name === 'MYSQL' && mysql === 'on') mysql = s.id;
            if (s.option_name === 'Laravel' && laravel === 'on') laravel = s.id;
            if (s.option_name === 'Oracle' && oracle === 'on') oracle = s.id;
            if (s.option_name === 'Basic' && php_tech === 'beginner') php_tech = s.id;
            if (s.option_name === 'Moderate' && php_tech === 'moderate') php_tech = s.id;
            if (s.option_name === 'Advance' && php_tech === 'advance') php_tech = s.id;
            if (s.option_name === 'Basic' && mysql_tech === 'beginner') mysql_tech = s.id;
            if (s.option_name === 'Moderate' && mysql_tech === 'moderate') mysql_tech = s.id;
            if (s.option_name === 'Advance' && mysql_tech === 'advance') mysql_tech = s.id;
            if (s.option_name === 'Basic' && laravel_tech === 'beginner') laravel_tech = s.id;
            if (s.option_name === 'Moderate' && laravel_tech === 'moderate') laravel_tech = s.id;
            if (s.option_name === 'Advance' && laravel_tech === 'advance') laravel_tech = s.id;
            if (s.option_name === 'Basic' && oracle_tech === 'beginner') oracle_tech = s.id;
            if (s.option_name === 'Moderate' && oracle_tech === 'moderate') oracle_tech = s.id;
            if (s.option_name === 'Advance' && oracle_tech === 'advance') oracle_tech = s.id;
        });

        // Basic Details

        const sql2 = 'insert into employee_master (`first_name`,`last_name`,`designation`,`address_1`,`email`,`address_2`,`phone`,`city`,`gender`,`state`,`relationship_status`,`zip_code`,`DOB`) values (?,?,?,?,?,?,?,?,?,?,?,?,?)';

        const basic_details = await db.promise().query(sql2, [fname, lname, designation, address_1, email, address_2, phone, city, gender, state, relation, zip, DOB]);

        employee_id = basic_details[0].insertId;

        // Education

        const sql4 = 'insert into education_2 (`emp_id`,`course`,`year`,`percentage`) values (?,?,?,?)';

        for (let i = 0; i < board.length; i++) {
            if (board[i] && passing[i] && per[i])
                await db.promise().query(sql4, [employee_id, board[i], passing[i], per[i]]);
        }

        // Preference

        const sql5 = 'insert into preference (`employee_id`,`location`,`notice_period`,`expected_ctc`,`current_ctc`,`department`) values (?,?,?,?,?,?)';

        const preference = await db.promise().query(sql5, [employee_id, location, notice, expected, current, department]);

        // Languages

        const sql6 = 'insert into language(`emp_id`,`lang_id`,`r`,`w`,`s`) values (?,?,?,?,?)';

        if (hindi) {
            if (r_h === 'on') r_h = 1;
            else r_h = 0;
            if (w_h === 'on') w_h = 1;
            else w_h = 0;
            if (s_h === 'on') s_h = 1;
            else s_h = 0;
            const h = await db.promise().query(sql6, [employee_id, hindi, r_h, w_h, s_h]);
        }

        if (english) {
            if (r_e === 'on') r_e = 1;
            else r_e = 0;
            if (w_e === 'on') w_e = 1;
            else w_e = 0;
            if (s_e === 'on') s_e = 1;
            else s_e = 0;
            const e = await db.promise().query(sql6, [employee_id, english, r_e, w_e, s_e]);
        }

        if (gujarati) {
            if (r_g === 'on') r_g = 1;
            else r_g = 0;
            if (w_g === 'on') w_g = 1;
            else w_g = 0;
            if (s_g === 'on') s_g = 1;
            else s_g = 0;
            const g = await db.promise().query(sql6, [employee_id, gujarati, r_g, w_g, s_g]);
        }

        // Technology

        const sql7 = 'insert into technology (`emp_id`,`tech_id`,`tech_level`) values (?,?,?)';

        if (php) await db.promise().query(sql7, [employee_id, php, php_tech]);
        if (mysql_tech) await db.promise().query(sql7, [employee_id, mysql, mysql_tech]);
        if (laravel) await db.promise().query(sql7, [employee_id, laravel, laravel_tech]);
        if (oracle) await db.promise().query(sql7, [employee_id, oracle, oracle_tech]);

        // Reference_Contact

        const sql8 = 'insert into reference_contact (`employee_id`,`ref_name`,`ref_contact`,`ref_relation`) values (?,?,?,?)';

        for (let i = 0; i < ref_1.length; i++) {
            if (ref_1[i] && contact_1[i] && relation_1[i]) await db.promise().query(sql8, [employee_id, ref_1[i], contact_1[i], relation_1[i]]);
        }

        // Experience

        const sql9 = 'insert into experience (`employee_id`,`company_name`,`designation`,`starting_date`,`end_date`) values (?,?,?,?,?)';

        for (let i = 0; i < com_1.length; i++) {
            if (com_1[i] && designation_1[i] && to_1[i] && from_1[i]) await db.promise().query(sql9, [employee_id, com_1[i], designation_1[i], to_1[i], from_1[i]]);
        }

        return res.json({msg:`<div style="text-align:center;">Form submitted successfully go through this <a href="http://localhost:7500/ajax/get_data">All Data</a></div>`});

    } catch (error) {
        console.log(error);
    }
}

exports.getUpdateForm = async(req,res,next)=>{
    try {
        const hindi = [], english = [], gujarati = [];
        const php = [], mysql = [], laravel = [], oracle = [];
        const userData = await db.promise().query('SELECT * FROM employee_master inner join preference on employee_master.employee_id = preference.employee_id where employee_master.employee_id = ?', [req.params.id]);
        const educationData = await db.promise().query('select * from education_2 where emp_id = ?', [req.params.id]);
        const referenceData = await db.promise().query('select * from reference_contact where employee_id = ?', [req.params.id]);
        const experienceData = await db.promise().query('select * from experience where employee_id = ?', [req.params.id]);
        const languageData = await db.promise().query('select * from language where emp_id = ?', [req.params.id]);
        const technologyData = await db.promise().query('select * from technology where emp_id = ?', [req.params.id]);
        const user = userData[0][0];
        const education = educationData[0];
        const reference = referenceData[0];
        const experience = experienceData[0];
        const language = languageData[0];
        const technology = technologyData[0];
        // console.log(user);
        // console.log(education);
        // console.log(reference);
        // console.log(experience);
        // console.log(technology);
        // console.log(language);
        technology.forEach((t) => {
            if (t.tech_id === 8) php.push(t);
            if (t.tech_id === 9) mysql.push(t);
            if (t.tech_id === 10) laravel.push(t);
            if (t.tech_id === 11) oracle.push(t);
        })
        language.forEach((l) => {
            if (l.lang_id === 5) hindi.push(l);
            if (l.lang_id === 6) english.push(l);
            if (l.lang_id === 7) gujarati.push(l);
        })
        res.render('index', { user, education, reference, experience, hindi, english, gujarati, php, mysql, laravel, oracle });
    } catch (error) {
        console.log(error);
    }
}

exports.updateForm = async(req,res,next)=>{
    const id = req.body.id;
    var { fname, lname, designation, address_1, email, address_2, phone, city, gender, state, relation, zip, DOB } = req.body;
    var { b_id, board, passing, per } = req.body;
    var { location, department, notice, expected, current } = req.body;
    var { h_id, hindi, r_h, w_h, s_h, e_id, english, r_e, w_e, s_e, g_id, gujarati, r_g, w_g, s_g } = req.body;
    var { p_id, m_id, l_id, o_id, php, php_tech, mysql, mysql_tech, laravel, laravel_tech, oracle, oracle_tech } = req.body;
    var { ref_id, ref_1, contact_1, relation_1 } = req.body;
    var { exp_id, com_1, designation_1, to_1, from_1 } = req.body;

    const sql1 = 'select o.id , s.select_name , o.option_name from option_master as o inner join select_master as s where o.s_id = s.id';

    const select_option = await db.promise().query(sql1);

    select_option[0].map((s) => {
        if (s.option_name === 'Male' && gender === 'male') gender = s.id;
        if (s.option_name === 'Female' && gender === 'female') gender = s.id;
        if (s.option_name === 'Single' && relation === 'single') relation = s.id;
        if (s.option_name === 'Married' && relation === 'married') relation = s.id;
        if (s.option_name === 'Hindi' && hindi === 'on') hindi = s.id;
        if (s.option_name === 'English' && english === 'on') english = s.id;
        if (s.option_name === 'Gujarati' && gujarati === 'on') gujarati = s.id;
        if (s.option_name === 'PHP' && php === 'on') php = s.id;
        if (s.option_name === 'MYSQL' && mysql === 'on') mysql = s.id;
        if (s.option_name === 'Laravel' && laravel === 'on') laravel = s.id;
        if (s.option_name === 'Oracle' && oracle === 'on') oracle = s.id;
        if (s.option_name === 'Basic' && php_tech === 'beginner') php_tech = s.id;
        if (s.option_name === 'Moderate' && php_tech === 'moderate') php_tech = s.id;
        if (s.option_name === 'Advance' && php_tech === 'advance') php_tech = s.id;
        if (s.option_name === 'Basic' && mysql_tech === 'beginner') mysql_tech = s.id;
        if (s.option_name === 'Moderate' && mysql_tech === 'moderate') mysql_tech = s.id;
        if (s.option_name === 'Advance' && mysql_tech === 'advance') mysql_tech = s.id;
        if (s.option_name === 'Basic' && laravel_tech === 'beginner') laravel_tech = s.id;
        if (s.option_name === 'Moderate' && laravel_tech === 'moderate') laravel_tech = s.id;
        if (s.option_name === 'Advance' && laravel_tech === 'advance') laravel_tech = s.id;
        if (s.option_name === 'Basic' && oracle_tech === 'beginner') oracle_tech = s.id;
        if (s.option_name === 'Moderate' && oracle_tech === 'moderate') oracle_tech = s.id;
        if (s.option_name === 'Advance' && oracle_tech === 'advance') oracle_tech = s.id;
    });

    const basic_details = await db.promise().query('update employee_master set first_name = ?,last_name=?,designation=?,address_1=?,email=?,address_2=?,phone=?,city=?,gender=?,state=?,relationship_status=?,zip_code=?,DOB=? where employee_id = ?', [fname, lname, designation, address_1, email, address_2, phone, city, gender, state, relation, zip, DOB, id]);

    // console.log(basic_details);

    const preference = await db.promise().query('update preference set location=?,notice_period=?,expected_ctc=?,current_ctc=?,department=? where employee_id=?', [location, notice, expected, current, department, id]);

    const education = 'update education_2 set course=?,year=?,percentage=? where emp_id=? and id=?';

    if (board) for (let i = 0; i < board.length; i++) {
        if (board[i] && passing[i] && per[i])
            await db.promise().query(education, [board[i], passing[i], per[i], id, b_id[i]]);
    }

    const experience = 'update experience set company_name=?,designation=?,starting_date=?,end_date=? where employee_id=? and experience_id=?';

    if (com_1) for (let i = 0; i < com_1.length; i++) {
        if (com_1[i] && designation_1[i] && to_1[i] && from_1[i]) await db.promise().query(experience, [com_1[i], designation_1[i], to_1[i], from_1[i], id, exp_id[i]]);
    }

    const reference = 'update reference_contact set ref_name=?,ref_contact=?,ref_relation=? where employee_id=? and ref_id=?';

    if (ref_1) for (let i = 0; i < ref_1.length; i++) {
        if (ref_1[i] && contact_1[i] && relation_1[i]) await db.promise().query(reference, [ref_1[i], contact_1[i], relation_1[i], id, ref_id[i]]);
    }

    const language = 'update language set lang_id = ?,r=?,w=?,s=? where emp_id=? and id=?';

    if (hindi) {
        if (r_h === 'on') r_h = 1;
        else r_h = 0;
        if (w_h === 'on') w_h = 1;
        else w_h = 0;
        if (s_h === 'on') s_h = 1;
        else s_h = 0;
        const h = await db.promise().query(language, [hindi, r_h, w_h, s_h, id, h_id]);
    }

    if (english) {
        if (r_e === 'on') r_e = 1;
        else r_e = 0;
        if (w_e === 'on') w_e = 1;
        else w_e = 0;
        if (s_e === 'on') s_e = 1;
        else s_e = 0;
        const e = await db.promise().query(language, [english, r_e, w_e, s_e, id, e_id]);
    }

    if (gujarati) {
        if (r_g === 'on') r_g = 1;
        else r_g = 0;
        if (w_g === 'on') w_g = 1;
        else w_g = 0;
        if (s_g === 'on') s_g = 1;
        else s_g = 0;
        const g = await db.promise().query(language, [gujarati, r_g, w_g, s_g, id, g_id]);
    }

    const sql7 = 'update technology set tech_id = ? , tech_level = ? where emp_id = ? and id = ?';

    if (php) await db.promise().query(sql7, [php, php_tech, id, p_id]);
    if (mysql_tech) await db.promise().query(sql7, [mysql, mysql_tech, id, m_id]);
    if (laravel) await db.promise().query(sql7, [laravel, laravel_tech, id, l_id]);
    if (oracle) await db.promise().query(sql7, [oracle, oracle_tech, id, o_id]);


    return res.json({msg:`<div style="text-align:center;">Form updated successfully go through this <a href="http://localhost:7500/ajax/get_data">All Data</a></div>`});
}