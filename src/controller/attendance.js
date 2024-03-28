const db = require("../config/connection");

exports.getAttendance = async(req,res,next)=>{
    try {

        const p = req.query.page || 1;

        const m = req.query.month || "December2023";

        const mt = m.slice(0, -4);

        const offset = (Number(p) - 1) * 50;

        const sql = `select s.id , s.fname , monthname(a.date_of_attendance) AS month_n ,count(a.status) as present_day from student_master AS s inner join attendance AS a on s.id = a.student_id  where a.status = 'p' group by id,month_n having month_n = "${mt}" order by s.id limit 50 offset ${offset}`;

        db.query(sql, (err, result) => {
            if (err) console.log(err);
            else res.render('attendance', { result, p, m })
        })

    } catch (error) {
        console.log(error);
    }
}