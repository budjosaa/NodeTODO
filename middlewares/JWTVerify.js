const express = require("express");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const { user } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "errors.unauthorized" });
  }
};
module.exports = verifyToken;
