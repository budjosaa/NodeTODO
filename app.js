var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const db = require("./src/db");
const errorHandler = require("./src/middlewares/ErrorHandler");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
db.connect();

var todosRouter = require("./src/routes/todos.router");
var authRouter = require("./src/routes/auth.router");

var app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

router = express.Router();
app.use("/api", router);

router.use("/todos", todosRouter);
router.use("/auth", authRouter);

app.use(errorHandler.handleError);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
