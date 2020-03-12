var express = require("express");
var router = express.Router();
const { User } = require("../models/User");
const { DiveLog } = require("../models/DiveLog");
const { isAuthenticated } = require("../utils/auth");
const moment = require("moment");

//新規追加
router.get("/new", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    res.render("divelogs/new", { title: "Log a Dive" });
  } else {
    res.redirect("/signin");
  }
});

router.post("/", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    const {} = req.params;
    var insertingDiveLog = new DiveLog({
      ...req.body,
      created_at: moment().unix(),
      updated_at: moment().unix()
    });
  } else {
    res.redirect("/signin");
  }

  // ドキュメントの保存
  insertingDiveLog.save(function(err) {
    if (isAuthenticated(req.user)) {
      if (err) console.log(err);
      res.redirect(req.baseUrl);
    } else {
      res.redirect("/signin");
    }
  });
});

//削除
router.delete("/:divelogId", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    const { divelogId } = req.params;
    DiveLog.remove({ _id: divelogId }, err => {
      res.redirect(req.baseUrl);
    });
  } else {
    res.redirect("/signin");
  }
});

//更新後の結果を表示
router.put("/:divelogId", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    const { divelogId } = req.params;
    DiveLog.update(
      { _id: divelogId },
      { $set: { ...req.body } },
      (err, result) => {
        res.redirect(`${req.baseUrl}/${divelogId}`);
      }
    );
  } else {
    res.redirect("/signin");
  }
});

//更新
router.get("/:divelogId/edit", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    const { divelogId } = req.params;
    DiveLog.find({ _id: divelogId }, (err, result) => {
      console.log(result);
      res.render("divelogs/edit", {
        title: "Edit Log",
        slug: "divelogs",
        divelog: result[0]
      });
    });
  } else {
    res.redirect("/signin");
  }
});

//詳細表示
router.get("/:divelogId", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    const { divelogId } = req.params;
    DiveLog.find({ _id: divelogId }, (err, result) => {
      res.render("divelogs/show", {
        title: "Dive Log",
        slug: "divelogs",
        divelog: result[0]
      });
    });
  } else {
    res.redirect("/signin");
  }
});

router.get("/", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    User.find({}, function(err, users) {
      if (err) console.log(err);
      console.log(users);
      res.render("divelogs/index", {
        title: "Dive Log",
        slug: "divelogs",
        result: users
      });
    }).populate("divelogs");
  } else {
    res.redirect("/signin");
  }
});

module.exports = router;
