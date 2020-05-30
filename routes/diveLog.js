var express = require("express");
var router = express.Router();
const { User } = require("../models/User");
const { DiveLog } = require("../models/DiveLog");
const { Spot } = require("../models/Spot");
const { isAuthenticated } = require("../utils/auth");
const moment = require("moment");
const countries = require("../public/countries.json");

//新規追加
router.get("/new", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    Spot.find({}, (err, result) => {
    // console.log(countries);
    res.render("divelogs/new", {
      title: "Log a Dive",
      slug: "Log a Dive",
      countries: countries.data,
      location: result,
      spots: result
    });
    });
    } else {
    res.redirect("/signin");
  }
  });

router.post("/", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    console.log(req);
    var insertingDiveLog = new DiveLog({
      ...req.body,
      user: req.user._id,
      created_at: moment().unix(),
      updated_at: moment().unix()
    });

    // ドキュメントの保存
    insertingDiveLog.save(function(err) {
      if (err) console.log(err);
      User.findOne({ _id: insertingDiveLog.user }, (err, result) => {
        if (err) console.log(err);

        User.update(
          { _id: insertingDiveLog.user },
          { $set: { divelogs: [...result.divelogs, insertingDiveLog._id] } },
          (err, result) => {
            res.redirect(`${req.baseUrl}/${insertingDiveLog._id}`);
          }
        );
      });
    });
  } else {
    res.redirect("/signin");
  }
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
    ).populate("spot");
  } else {
    res.redirect("/signin");
  }
});

//更新
router.get("/:divelogId/edit", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    const { divelogId } = req.params;
    DiveLog.find({ _id: divelogId }, (err, result) => {
      Spot.find({}, (err, result) => {
        console.log(result);
      console.log(countries);
      res.render("divelogs/edit", {
        title: "Edit Log",
        slug: "divelogs",
        divelog: result[0],
        countries: countries.data,
        location: result,
        spots: result
      });
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
    DiveLog.findOne({ _id: divelogId }, function(err, divelog){
      const data = {
        _id: divelog._id,
        user: divelog.user,
        spot: divelog.spot,
        date: moment(divelog.date).format("YYYY/MM/DD"),
        entry: divelog.entry,
        current: divelog.current,
        weather: divelog.weather,
        air_temperature: divelog.air_temperature,
        water_temperature: divelog.water_temperature,
        depth: divelog.depth,
        duration: divelog.duration,
        note: divelog.note,
        created_at: divelog.created_at,
        updated_at: divelog.updated_at,
      };
      console.log(data);
      res.render("divelogs/show", {
        title: "Dive Log",
        slug: "divelogs",
        result: data,
      });
    }).populate("spot");
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
