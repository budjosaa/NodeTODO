const express = require("express");
const router = express.Router();
const User = require("./models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const dotEnv = env.config();
getJWT = (user, secret) => {
  return jwt.sign({ user: user }, secret);
};

router.post("/register", (req, res, next) => {
  const hashPass = bcrypt.hashSync(req.body.password, 10);
  const user = new User({
    username: req.body.username,
    password: hashPass,
    email: req.body.email
  });
  user
    .save()
    .then(savedUser => {
      const token = getJWT(savedUser, process.env.JWT_SECRET);
      res.json({ savedUser, token });
    })
    .catch(err => {
      next(err);
    });
});

router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user === null) {
        next(new Error("User not found!"));
      }
      const compPass = bcrypt.compareSync(req.body.password, user.password);
      if (compPass) {
        const token = getJWT(user, process.env.JWT_SECRET);
        res.json({ user, token });
      } else {
        res.json("Wrong password");
      }
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
