var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var session = require("express-session");
var mysqlStore = require('express-mysql-session');

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var customersRouter = require("./routes/customers");
var loginRouter = require("./routes/login");
var registerRouter = require("./routes/register");
var testAPIRouter = require("./routes/testAPI");
var signoutRouter = require("./routes/logout");
const dbConfig = require("./config/db.config");

var app = express();

const oneDay = 1000 * 60 * 60 * 24;
const dbOptions ={
  connectionLimit: 10,
  password: dbConfig.PASSWORD,
  user: dbConfig.USER,
  database: dbConfig.DB,
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  createDatabaseTable: true
};
const sessionStore = new mysqlStore(dbOptions);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

var corsOptions = {
  origin: ['https://localhost:3000'],
  credentials: true
};

app.use(
  cors({
    origin: "https://localhost:3000",
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    store: sessionStore,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/testAPI", testAPIRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/customers", customersRouter);
app.use("/logout", signoutRouter);

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
  res.render("error");
});

module.exports = app;
