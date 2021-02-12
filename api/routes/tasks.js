import express from 'express';
import {db} from '../db';
const router = express.Router();

router.get('/', function(req, res, next) {
    db.connect();
    db.query('SELECT * FROM tasks', function (err, rows, fields) {
        if (err) throw err;

        console.log('The solution is: ', rows)
    });

    db.end();
res.status(200).send('list');
});

export default router;