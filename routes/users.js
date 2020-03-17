var express = require("express");
const bcrypt = require("bcrypt");
var router = express.Router();
const { User } = require("../models/User");
const { isAuthenticated } = require("../utils/auth");
const moment = require("moment");

//削除
router.delete("/:userId", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    const { userId } = req.params;
    User.remove({ _id: userId }, err => {
      res.redirect(req.baseUrl);
    });
  } else {
    res.redirect("/signin");
  }
});

//更新後の結果を表示
router.put("/:userId", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    const { userId } = req.params;
    User.update({ _id: userId }, { $set: { ...req.body } }, (err, result) => {
      res.redirect(`${req.baseUrl}/${userId}`);
    });
  } else {
    res.redirect("/signin");
  }
});

//更新
router.get("/:userId/edit", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    const { userId } = req.params;
    User.find({ _id: userId }, (err, result) => {
      console.log(result);
      res.render("users/edit", {
        title: "Edit Profile",
        slug: "users",
        user: result[0]
      });
    });
  } else {
    res.redirect("/signin");
  }
});

/* GET user listing. */
router.get("/:userId/logs", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    const { _id } = req.user;
    const { userId } = req.params;

    const isMe = userId === _id;

    User.find({ _id: userId }, (err, result) => {
      res.render("users/users_log", {
        title: "Users Log",
        slug: "users",
        result,
        isMe
      });
    }).populate("divelogs");
  } else {
    res.redirect("/signin");
  }
});

//my profile
router.get("/profile", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    const { _id } = req.user;
    User.findOne({ _id: _id }, function(err, user) {
      const data = {
        _id: user._id,
        username: user.username,
        DOB: moment(user.DOB).format("YYYY/MM/DD"),
        certificate: user.certificate,
        country: user.country,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at
      };
      res.render("users/profile", {
        title: "User",
        slug: "users",
        result: data
      });
    });
  } else {
    res.redirect("/signin");
  }
});

//詳細表示
router.get("/:userId", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    const { userId } = req.params;
    User.findOne({ _id: userId }, function(err, user) {
      const data = {
        _id: user._id,
        username: user.username,
        DOB: moment(user.DOB).format("YYYY/MM/DD"),
        certificate: user.certificate,
        country: user.country,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at
      };
      res.render("users/show", { title: "User", slug: "users", result: data });
    });
  } else {
    res.redirect("/signin");
  }
});

/* GET users listing. */
router.get("/", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    User.find({}, (err, result) => {
      res.render("users/index", {
        title: "User",
        slug: "users",
        result: result
      });
    });
  } else {
    res.redirect("/signin");
  }
});

//user registration
router.post("/", function(req, res, next) {
  var insertingUser = new User({
    ...req.body,
    password: req.body.password ? bcrypt.hashSync(req.body.password, 10) : "",
    created_at: moment().unix(),
    updated_at: moment().unix()
  });

  //save new user info and redirect to login screen
  insertingUser.save(function(err) {
    if (err) {
      const errors = [
        err.errors["username"],
        err.errors["email"],
        err.errors["password"]
      ];

      console.log(errors);

      const newErrors = errors
        .filter(object => object)
        .map(error => {
          return error.message;
        });

      req.flash("error", newErrors);
      res.redirect(`/signup`);
    } else {
      res.redirect("/signin");
    }
  });
});

module.exports = router;
