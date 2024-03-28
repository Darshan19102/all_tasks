const db = require("../config/connection");

exports.getExamData = async (req, res, next) => {
    try {
        const p = req.query.page || 1;

        const offset = (Number(p) - 1) * 60;


        const sql = `select student_id , student_master.fname , exam_type_id , sum(practical_obtain_marks) 
        as practical, sum(obtain_theory_marks) as theory from exam_data
        inner join student_master on exam_data.student_id = student_master.id
        group by student_id,exam_type_id limit 60 offset ${offset}`;

        db.query(sql, (err, result) => {
            if (err) console.log(err);
            else res.render('exam', { p, result });
        })
    } catch (error) {
        console.log(error);
    }
}

exports.getReportData = async (req, res, next) => {
    try {
        const id = req.query.id;

        const sql = `select exam_data.*,student_master.*,subject_master.* from exam_data
        inner join student_master on exam_data.student_id = student_master.id
        inner join subject_master on exam_data.subject_id = subject_master.id
        where student_id = ${id}`;

        const sql2 = `select count(*) as total_attendance from attendance where student_id = ${id} and status = 'p'`;

        db.query(sql, (err, result) => {
            if (err) console.log(err);
            db.query(sql2, (err, result2) => {
                if (err) console.log(err);
                res.render('report', { result, result2 });
            })
        })

    } catch (error) {
        console.log(error);
    }
}