const db = require("../config/connection");


exports.getDynamicQueryOutput = async(req,res,next)=>{
    try {
        const result = [];

        if (req.query.query) {

            const p = req.query.page || 1;
            const query1 = req.query.query;

            db.query(query1, (err, result) => {

                if (err) res.json(err)

                else {

                    let maxlength = Math.ceil(result.length / 50);
                    let offset = (Number(p) - 1) * 50;
                    const query2 = query1 + ` limit 50 offset ${offset}`;
                    const keys = Object.keys(result[0]);

                    db.query(query2, (err, result) => {
                        if (err) console.log(err);
                        else res.render('dynamic_query', { result, keys, query1, query2, p, maxlength });
                    })

                }
            })

        } else {
            res.render('dynamic_query', { result });
        }

    } catch (error) {
        console.log(error);
    }
}