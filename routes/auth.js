var express = require("express");
const passport = require("passport");
var router = express.Router();

router.post(
  "/",
  (req, res, next) => {
    next();
  },
  passport.authenticate("local", {
    failureFlash: "Invalid Username or Password.",
    successFlash: "Welcome!",
    failureRedirect: "/signin"
  }),
  (req, res) => {
    // console.log(req.user);
    res.redirect("/dashboard");
  }
);

module.exports = router
