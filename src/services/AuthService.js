const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
const InvalidDataError = require("../errors/InvalidData");

getJWT = user => {
  return jwt.sign({ user: user }, process.env.JWT_SECRET);
};

module.exports = {
  registerUser: async data => {
    try {
      const user = new User({ ...data });
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
        throw new InvalidDataError("User not found");
      }

      if (user.comparePassword(data.password)) {
        const token = getJWT(user);
        return { user, token };
      } else {
        throw new InvalidDataError("Wrong password!");
      }
    } catch (err) {
      throw err;
    }
  }
};
