var express = require("express");
const passport = require("passport");
const { isAuthenticated } = require("../utils/auth");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    res.redirect("/dashboard");
  } else {
    res.render("index", { title: "Express" });
  }
});

router.get("/failure", function(req, res, next) {
  res.render("failure", { title: "Express" });
});

router.get("/signin", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    res.redirect("/dashboard");
  } else {
  res.render("signin", { title: "Express" });
  }
});

router.get("/signup", function(req, res, next) {
  res.render("signup", { title: "Express" });
});

router.post("/signout", (req, res) => {
  req.session.passport.user = undefined;
  res.redirect("/");
});

module.exports = router;
