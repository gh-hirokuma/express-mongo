var createError = require("http-errors");
const bcrypt = require("bcrypt");
const connect = require("connect");
var express = require("express");
const flash = require("express-flash");
const session = require("express-session");
var path = require("path");
var cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
var logger = require("morgan");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var spotsRouter = require("./routes/spots");
var divelogsRouter = require("./routes/diveLog");
var authRouter = require("./routes/auth");
var dashboardRouter = require("./routes/dashboard");
var dashboard_spotsRouter = require("./routes/dashboard_spots");
var index_spotsRouter = require("./routes/index_spots");

const { User } = require("./models/User");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist/"));
app.use("/select2", express.static(__dirname + "/node_modules/select2/dist/"));
app.use("/mongo-cursor-pagination", express.static(__dirname + "/node_modules/mongo-cursor-pagination/dist/"));

//log in by session. not by cookie
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: false
  })
);

app.use(flash());

//define login method
passport.use(
  new LocalStrategy(async (username, password, done) => {
    await User.findOne({ username: username }, (err, result) => {
      if (err) console.log(err);

      if (!result) {
        return done(null, false);
      }

      console.log("password", password);
      console.log("result.password", result.password);

      if (bcrypt.compareSync(password, result.password)) {
        return done(null, {
          username: username,
          password: password,
          _id: result._id
        });
      } else {
        return done(null, false);
      }
    });
  })
);

//must for passport
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

//activate
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/spots", spotsRouter);
app.use("/divelogs", divelogsRouter);
app.use("/auth", authRouter);
app.use("/dashboard", dashboardRouter);
app.use("/dashboard_spots", dashboard_spotsRouter);
app.use("/index_spots", index_spotsRouter);

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
