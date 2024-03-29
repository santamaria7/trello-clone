import express from "express";
import { db } from "../db";
const columnsRouter = express.Router();

columnsRouter.get("/", async function (req, res, next) {
  const query = `SELECT * FROM columns`;
  await db.query(query, function (err, rows) {
    err ? res.status(500).send({ err }) : res.status(200).send(rows);
  });
});

columnsRouter.post("/add", async function (req, res, next) {
  const query = `INSERT INTO columns (name) VALUES ("${req.body.name}")`;
  await db.query(query, function (err, result) {
    //TODO: refactor
    err ? res.status(500).send({ err }) : res.status(200).send({ result });
  });
});

columnsRouter.post("/edit", async function (req, res, next) {
  const query = `UPDATE columns SET name = "${req.body.name}" WHERE columnId = ${req.body.columnId}`;
  await db.query(query, function (err, result) {
    //TODO: refactor
    err ? res.status(500).send({ err }) : res.status(200).send({ result });
  });
});

columnsRouter.post("/delete", async function(req, res, next){
  const query = `DELETE FROM columns WHERE columnId = ${req.body.columnId}`;
  await db.query(query, function(err,result){
    //TODO: refactor
    err ? res.status(500).send({ err }) : res.status(200).send({ result });
  })
})

export default columnsRouter;
