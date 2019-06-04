const express = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
const Unauthorized = require("../errors/Unauthorized");
verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const { user } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    throw new Unauthorized("Unauthorized");
  }
};
module.exports = verifyToken;
