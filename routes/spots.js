var express = require("express");
var router = express.Router();
const { Spot } = require("../models/Spot");
const moment = require("moment");
const { v1 } = require("uuid");
var multer = require("multer");

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

//新規追加
router.get("/new", function(req, res, next) {
  res.render("spots/new", { title: "Dive Spots" });
});

//削除
router.delete("/:spotId", function(req, res, next) {
  const { spotId } = req.params;

  Spot.remove({ _id: spotId }, err => {
    res.redirect(req.baseUrl);
  });
});

//更新後の結果を表示
router.put("/:spotId", function(req, res, next) {
  const { spotId } = req.params;

  Spot.update({ _id: spotId }, { $set: { ...req.body } }, (err, result) => {
    res.redirect(`${req.baseUrl}/${spotId}`);
  });
});

//更新
router.get("/:spotId/edit", function(req, res, next) {
  const { spotId } = req.params;
  Spot.find({ _id: spotId }, (err, result) => {
    console.log(result);
    res.render("spots/edit", {
      title: "Dive Spots",
      slug: "spots",
      spot: result[0]
    });
  });
});

//詳細表示
router.get("/:spotId", function(req, res, next) {
  const { spotId } = req.params;
  Spot.find({ _id: spotId }, (err, result) => {
    res.render("spots/show", {
      title: "Dive Spots",
      slug: "spots",
      spot: result[0]
    });
  });
});

//一覧
/* GET users listing. */
router.get("/", function(req, res, next) {
  Spot.find({}, (err, result) => {
    res.render("spots/index", {
      title: "Dive Spots",
      slug: "spots",
      result: result
    });
  });
});

//画像を受けとる
router.post("/", upload.single("file"), function(req, res, next) {
  const { path } = res.req.file;

  const tmpPath = path
    .split("/")
    .filter(path => path !== "public")
    .join("/");

  const realPath = `/${tmpPath}`;
  console.log(realPath);

  var insertingSpot = new Spot({
    ...req.body,
    image: realPath,
    created_at: moment().unix(),
    updated_at: moment().unix()
  });

  // ドキュメントの保存
  insertingSpot.save(function(err) {
    if (err) console.log(err);

    res.redirect(req.baseUrl);
  });
});

module.exports = router;
