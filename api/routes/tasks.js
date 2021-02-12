import express from 'express';
import {db} from '../db';
const router = express.Router();

router.get('/', function(req, res, next) {
    let data;
    db.connect();
    db.query('SELECT * FROM tasks', function (err, rows) {
        if (err) throw err;
        data = rows;
    });

    db.end();
res.status(200).send(data);
});

export default router;