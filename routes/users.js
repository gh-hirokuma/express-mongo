var express = require("express");
var router = express.Router();
import { User } from "../models/User";
import moment from "moment";




//新規追加
router.get("/new", function(req, res, next) {
  res.render("users/new", { title: "User"});
});


//削除
router.delete("/:userId", function(req, res, next) {
  const { userId } =  req.params

  User.remove({ _id: userId }, (err) => {
    res.redirect(req.baseUrl)
  })
})





//更新後の結果を表示
router.put("/:userId", function(req, res, next) {
  const { userId } =  req.params

  User.update({ _id: userId }, { $set: { ...req.body } }, (err, result) => {
    res.redirect(`${req.baseUrl}/${userId}`)
  })
});


//更新
router.get("/:userId/edit", function(req, res, next) {
  const { userId } =  req.params
  User.find({ _id: userId }, (err, result) => {
    console.log(result)
    res.render("users/edit", { title: "Edit Profile", slug: 'users', user: result[0]});
  })

});




//詳細表示
router.get("/:userId", function(req, res, next) {
  const { userId } =  req.params
  User.findOne({ _id: userId }, function(err, user){
    const data ={
      _id: user._id,
      name: user.name,
      DOB: moment(user.DOB).format("YYYY/MM/DD"),
      certificate: user.certificate,
      country: user.country,
      created_at: user.created_at,
      updated_at: user.updated_at
    };

  res.render("users/show", {title:"User", slug: 'users', result:data});
  });
})

/* GET users listing. */
router.get("/", function(req, res, next) {
  User.find({}, (err, result) => {
    res.render("users/index", { title: "User", slug: 'users', result: result });
  })
});


module.exports = router;
