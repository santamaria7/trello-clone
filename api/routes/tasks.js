import express from "express";
import { db } from "../db";
const router = express.Router();

router.get("/", async function (req, res, next) {
  db.connect();
  const {_results: result} = await db.query("SELECT * FROM tasks", function (err, rows) {
    if (err) throw err;
    return rows
  });

  db.end();
  res.status(200).send(result);
});

export default router;
