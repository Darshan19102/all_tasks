const db = require("../config/connection");

exports.getStudents = async(req,res,next)=>{
    try {
        const p = req.query.page || 1;
        var o = req.query.order || 'asc';
        const o_b = req.query.order_by || 'id'
        const offset = (Number(p) - 1) * 200;
        const data = `select * ,DATE_FORMAT(DOB, "%d/%m/%Y") as DOB,DATE_FORMAT(created_at, "%d/%m/%Y %T") as created_at from student_master_2 order by ${o_b} ${o} limit 200 offset ${offset}`;
        var o1 = '';
        if (o == 'asc') o1 = 'desc';
        else o1 = 'asc';
        db.query(data, (err, result) => {
            if (err) console.log(err);
            else {
                res.render('students', { result, p, o, o_b, o1 });
            }
        });
    } catch (error) {
        console.log(error);
    }
}