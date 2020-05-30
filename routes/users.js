var express = require("express");
const bcrypt = require("bcrypt");
var router = express.Router();
const { User } = require("../models/User");
// const { DiveLog } = require("../models/DiveLog");
const { isAuthenticated } = require("../utils/auth");
const moment = require("moment");
var multer = require("multer");
const countries = require("../public/countries.json");
const { v1 } = require("uuid");

//画像
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, `${v1()}-${file.originalname}`);
  }
});

var upload = multer({ storage: storage });

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
router.put("/:userId", upload.single("file"), function(req, res, next) {
  if (isAuthenticated(req.user)) {
    console.log(res.req);
    const { userId } = req.params;
    let realPath = "";
    if (res.req.file) {
      const { path } = res.req.file;
      const tmpPath = path
        .split("/")
        .filter(path => path !== "public")
        .join("/");
      realPath = `/${tmpPath}`;
      console.log(realPath);
    };
    User.update({ _id: userId }, { $set: { ...req.body, image: realPath} }, (err, result) => {
      res.redirect(`${req.baseUrl}/profile`);
    });
  } else {
    res.redirect("/signin");
  }
});

// 更新
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

/* GET user's log. */
router.get("/:userId/logs", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    const { _id } = req.user;
    const { userId } = req.params;
    const isMe = userId === _id;
    User.findOne({_id: req.user._id}, (err, result) => {
      console.log(result);
      res.render("users/users_log", {
        title: "Users Log",
        slug: "users",
        result,
        isMe
      });
    }).populate({ path: "divelogs", populate: { path: "spot" }});
  } else {
    res.redirect("/signin");
  }
});

// my profile
router.get("/profile", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    const { _id } = req.user;
    User.findOne({ _id: _id }, function(err, user)
    {
      const data = {
        _id: user._id,
        username: user.username,
        DOB: moment(user.DOB).format("YYYY/MM/DD"),
        certificate: user.certificate,
        country: user.country,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
        divelogs: user.divelogs,
        image: user.image,
      };
      res.render("users/profile", {
        title: "User",
        slug: "users",
        result: data,
      });
    }).populate({ path: "divelogs", populate: { path: "spot" }});
  } else {
    res.redirect("/signin");
  }
});

//詳細表示
router.get("/:userId", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    const { userId } = req.params;
    User.findOne({ _id: userId }, function(err, user) {
      {
        const data = {
          _id: user._id,
          username: user.username,
          DOB: moment(user.DOB).format("YYYY/MM/DD"),
          certificate: user.certificate,
          country: user.country,
          email: user.email,
          created_at: user.created_at,
          updated_at: user.updated_at,
          divelogs: user.divelogs,
          image: user.image,
        };
        res.render("users/show", { title: "User", slug: "users", result: data });
    }}).populate({ path: "divelogs", populate: { path: "spot" }});
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

//user registration upload.single("file"),
router.post("/", upload.single("file"), function(req, res, next) {
  let realPath = "";

  if (res.req.file) {
    const { path } = res.req.file;

    const tmpPath = path
      .split("/")
      .filter(path => path !== "public")
      .join("/");

    realPath = `/${tmpPath}`;
    console.log(realPath);
  }

  insertingUser = new User({
    ...req.body,
    image: realPath,
    created_at: moment().unix(),
    updated_at: moment().unix()
  });

  error = insertingUser.validateSync();
    if (error) {
      const errors = [
        error.errors["username"],
        error.errors["email"],
        error.errors["password"]
      ];

      const newErrors = errors
      .filter(object => object)
      .map(error => {
        return error.message;
      });

      req.flash("error", newErrors);
      res.redirect(`/signup`);
    } else {
      insertingUser.password = bcrypt.hashSync(insertingUser.password, 10);
      insertingUser.save({ validateBeforeSave: false }, function(err) {
      res.redirect("/signin");
    });
  }
});

module.exports = router;
