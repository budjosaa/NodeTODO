const express = require("express");
const mongoose = require("mongoose");
const TODO = require("./TODOModel");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const users = new Schema({
  username: { type: String, required: true, unique: true, minlength: 5 },
  email: { type: String, required: true, unique: true, minlength: 7 },
  password: { type: String, required: true, minlength: 5 },
  TODOs: [
    {
      type: Schema.Types.ObjectId,
      ref: "TODO"
    }
  ]
});
users.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const hash = bcrypt.hashSync(this.password, 10);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});
users.methods.comparePassword = function(pw) {
  try {
    return bcrypt.compareSync(pw, this.password);
  } catch (err) {
    throw err;
  }
};

var User = mongoose.model("User", users);
module.exports = User;
