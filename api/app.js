import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import indexRouter from "./routes/index";
import tasksRouter from "./routes/tasks";
import columnsRouter from "./routes/columns";

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());


app.use("/", indexRouter);
app.use("/columns", columnsRouter)
app.use("/tasks", tasksRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({err});
});

export default app;
