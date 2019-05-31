const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = new Schema({
  username: { type: String, required: true, unique: true, minlength: 5 },
  email: { type: String, required: true, unique: true, minlength: 7 },
  password: { type: String, required: true, minlength: 5 }
});
var User = mongoose.model("User", users);
module.exports = User;
