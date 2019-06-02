const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
getJWT = user => {
  return jwt.sign({ user: user }, process.env.JWT_SECRET);
};
module.exports = {
  registerUser: async (req, res, next) => {
    const hashPass = bcrypt.hashSync(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashPass,
      email: req.body.email
    });
    try {
      const savedUser = await user.save();
      const token = getJWT(savedUser);
      res.json({ savedUser, token });
    } catch (err) {
      next(err);
    }
  },
  loginUser: async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user === null) {
        throw new Error("User not found!");
      }
      const compPass = bcrypt.compareSync(req.body.password, user.password);
      if (compPass) {
        const token = getJWT(user);
        res.json({ user, token });
      } else {
        res.json({ message: "Wrong password!" });
      }
    } catch (err) {
      next(err);
    }
  }
};
