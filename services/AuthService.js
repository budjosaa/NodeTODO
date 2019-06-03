const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
getJWT = user => {
  return jwt.sign({ user: user }, process.env.JWT_SECRET);
};
module.exports = {
  registerUser: async data => {
    const hashPass = bcrypt.hashSync(data.password, 10);
    const user = new User({
      username: data.username,
      password: hashPass,
      email: data.email
    });
    try {
      const savedUser = await user.save();
      const token = getJWT(savedUser);
      return { user: savedUser, token };
    } catch (err) {
      throw err;
    }
  },
  loginUser: async data => {
    try {
      const user = await User.findOne({ email: data.email });
      if (user === null) {
        throw new Error("User not found!");
      }
      const compPass = bcrypt.compareSync(data.password, user.password);
      if (compPass) {
        const token = getJWT(user);
        return { user, token };
      } else {
        return { message: "Wrong password!" };
      }
    } catch (err) {
      throw err;
    }
  }
};
