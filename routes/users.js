var express = require("express");
var router = express.Router();
var User = require("./models/userModel");
const verifyToken = require("../middlewares/JWTVerify");

/* GET users listing. */
router.get("/", verifyToken, function(req, res, next) {
  User.find().then(users => {
    res.json(users);
  });
});

module.exports = router;
