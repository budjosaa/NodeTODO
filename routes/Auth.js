const express = require("express");
const router = express.Router();
const User = require("./models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(pass => {
    const user = new User({
      username: req.body.username,
      password: pass,
      email: req.body.email
    });
    user
      .save()
      .then(savedUser => {
        jwt.sign({ user: savedUser }, "secret", (err, token) => {
          res.json({ message: "You are logged in!", savedUser, token });
        });
      })
      .catch(err => {
        next(err);
      });
  });
});
router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user === null) {
        next(new Error("User not found!"));
      }
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) {
          res.json({ message: "err" });
        } else if (isMatch) {
          jwt.sign({ user: user }, "secret", (err, token) => {
            res.json({ message: "Logged in", user, token });
          });
        } else {
          res.json({ message: "Wrong password" });
        }
      });
    })
    .catch(err => {
      next(err);
    });
});
module.exports = router;
