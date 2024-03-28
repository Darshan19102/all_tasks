const db = require("../config/connection");

exports.getStudentsData = async(req,res,next)=>{
    try {

        const { id, fname, lname, city, department, dob, age, pincode, operator } = req.query;

        const p = req.query.page || 1;

        // console.log(p);

        const offset = (Number(p) - 1) * 50;

        const limit = ` limit 50 offset ${offset}`

        var query = `select * ,DATE_FORMAT(DOB, "%d/%m/%Y") as DOB,DATE_FORMAT(created_at, "%d/%m/%Y %T") as created_at from student_master_2`;

        var data = "";

        const keys = Object.keys(req.query);

        keys.forEach((k) => {
            if (!query.includes("where")) query += " where";

            if (k === 'id' && k != 'page') query += ` ${k} = "${req.query[k]}" `;

            if (req.query[k] && k != 'operator' && k != 'id' && k != 'page') query += ` ${k} LIKE '%${req.query[k]}%' ${req.query['operator']}`;
        })

        if (req.query['operator'] === 'AND') data = query.slice(0, -4);

        if (req.query['operator'] === 'OR') data = query.slice(0, -3);


        if (data) {
            db.query(data, (err, result) => {
                if (err) console.log(err);
                else {
                    const maxlength = Math.ceil(result.length / 50);
                    const query2 = data + limit;
                    db.query(query2, (err, result) => {
                        if (err) console.log(err);
                        else res.render('student_data', { result, p, id, fname, lname, city, department, dob, age, pincode, operator, maxlength });
                    })
                }
            })
        } else {
            if (req.query.page) query = query.slice(0, -5);
            db.query(query, (err, result) => {
                if (err) console.log(err);
                else {
                    const maxlength = Math.ceil(result.length / 50);
                    const query2 = query + limit;
                    db.query(query2, (err, result) => {
                        if (err) console.log(err);
                        else res.render('student_data', { result, p, id, fname, lname, city, department, dob, age, pincode, operator, maxlength });
                    })
                }
            });
        }

    } catch (error) {
        console.log(error);
    }
}