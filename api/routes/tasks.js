import express from "express";
import { db } from "../db";
const tasksRouter = express.Router();

tasksRouter.get("/", async function (req, res, next) {
  // db.connect();
  await db.query("SELECT * FROM tasks", function (err, rows) {
    if (err) throw err;
    res.status(200).send(rows);
  });
  // db.end();
});

tasksRouter.get("/:taskId", async function (req, res, next) {
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

tasksRouter.post("/update", async function (req, res, next) {
  const data = req.body;
  const fields = Object.keys(data).filter((key) => key !== "id");
  let query = `UPDATE tasks SET `;
  fields.forEach((field, index) => {
    query += `${field} = "${data[field]}"`;
    if (index < fields.length - 1) {
      query += `, `;
    }
  });
  query += ` WHERE id = "${data.id}"`;

  await db.query(query, function (err, result) {
    if (err) {
      res.status(500).send({ err });
    }
    res.status(200).send({result});
  });
});

tasksRouter.post("/save", async function (req, res, next) {
  const { creator, date, status, assignee, title, description, target, columnId} =
    req.body;
  const query = `INSERT INTO tasks (creator, date, status, assignee, title, description, target, columnId) VALUES ("${creator}", ${date}, "${status}", "${assignee}", "${title}", "${description}", "${target}", ${columnId})`;

  await db.query(query, function (err, result) {
    if (err) {
      res.status(500).send({ err });
    }
    res.status(200).send({result});
  });

});

export default tasksRouter;
