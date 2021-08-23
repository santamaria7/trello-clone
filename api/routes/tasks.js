import express from "express";
import { db } from "../db";
const router = express.Router();

router.get("/", async function (req, res, next) {
 // db.connect();
  await db.query(
    "SELECT * FROM tasks",
    function (err, rows) {
      if (err) throw err;
      res.status(200).send(rows);
    }
  );
 // db.end();
});

router.get("/:taskId", async function (req, res, next) {
 // db.connect();
  const { _results: result } = await db.query(
    "SELECT * FROM tasks",
    function (err, rows) {
      if (err) throw err;
      return rows[req.params.taskId];
    }
  );

  //db.end();
  res.status(200).send(result);
});

router.post("/save", async function (req, res, next) {
  const {
    creator,
    date,
    status,
    assignee,
    title,
    description,
    target,
  } = req.body;
  const query = `INSERT INTO tasks (creator, date, status, assignee, title, description, target) VALUES ("${creator}", ${date}, "${status}", "${assignee}", "${title}", "${description}", "${target}")`;
 // db.connect();
  await db.query(query, function (err, rows) {
    if (err) throw err;
    return rows;
  });

 // db.end();
  res.status(200).send('success');
});

export default router;
