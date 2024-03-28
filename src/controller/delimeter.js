const db = require("../config/connection");

exports.getDelimeter = async(req,res,next)=>{
    try {

        const data = req.query.delimeter || "";

        var firstname = [];
        var lastname = [];
        var age = [];
        var department = [];
        var pincode = [];
        var city = [];

        var sql = 'select * ,DATE_FORMAT(DOB, "%d/%m/%Y") as DOB,DATE_FORMAT(created_at, "%d/%m/%Y %T") as created_at from student_master';

        var response = await value(data);

        response.forEach((r) => {
            if (!sql.includes("where")) sql += " where ";
            if (r.charAt(0) == '_') firstname.push(`fname LIKE '%${r.slice(1)}%'`);
            if (r.charAt(0) == '^') lastname.push(`lname LIKE '%${r.slice(1)}%'`);
            if (r.charAt(0) == '$') pincode.push(`pincode = ${r.slice(1)}`);
            if (r.charAt(0) == '{') department.push(`department LIKE '%${r.slice(1)}%'`);
            if (r.charAt(0) == '}') age.push(`age = ${r.slice(1)}`);
            if (r.charAt(0) == ':') city.push(`city LIKE '%${r.slice(1)}%'`);
        });

        if (firstname.length > 0) sql += firstname.join(" OR ") + " AND ";
        if (lastname.length > 0) sql += lastname.join(" OR ") + " AND ";
        if (pincode.length > 0) sql += pincode.join(" OR ") + " AND ";
        if (department.length > 0) sql += department.join(" OR ") + " AND ";
        if (age.length > 0) sql += age.join(" OR ") + " AND ";
        if (city.length > 0) sql += city.join(" OR ") + " AND ";

        
        if (sql.includes("where")) sql = sql.slice(0, -4);
                
        db.query(sql, (err, result) => {
            if (err) console.log(err);
            else res.render('delimeter', { result, data })
        });

    } catch (error) {
        console.log(error);
    }
}

async function value(data) {
    var values = [];

    let i = 0;

    while (i < data.length) {
        let v = data.charAt(i);
        let j = i + 1;
        while (data.charAt(j) != '_' && data.charAt(j) != '^' && data.charAt(j) != '$' && data.charAt(j) != '{' && data.charAt(j) != '}' && data.charAt(j) != ':' && j != data.length) {
            v += data.charAt(j);
            j++;
        }
        values.push(v);
        i = j;
    }
    console.log(values);

    return values;
}