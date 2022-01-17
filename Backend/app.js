var createError = require("http-errors");
var express = require("express");
const handlebars = require("handlebars");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var logger = require("morgan");
var express = require("express");
var exphbs = require("express-handlebars");

//routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var dashboardRouter = require("./routes/dashboard");
const validaToken = require("./middlewares/validate-token");
const admin = require("./routes/admin");
const leadUser = require("./routes/lead");
const objective = require("./routes/objective");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const handlebarsHelpers = require("./helpers");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    helpers: handlebarsHelpers(exphbs),
    handlebars: allowInsecurePrototypeAccess(handlebars),
  })
);
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/public/images", express.static(path.join(__dirname, "images")));

app.use(
  session({
    key: "admin_sid",
    secret: "Bl4kL1zt",
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 600000 },
  })
);

// app.use((req, res, next) => {
//   if (req.cookies.user_sid && !req.session.user) {
//       res.clearCookie('user_sid');
//   }
//   // next();
// });

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use("/api/objective", objective);

app.use("/api/lead", leadUser);

app.use("/auth", authRouter);

app.use("/dashboard", dashboardRouter);
app.use("/admin", validaToken.verifyToken, admin);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  console.log(err);
  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
