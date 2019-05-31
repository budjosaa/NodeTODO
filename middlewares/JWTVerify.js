const express = require("express");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (err) {
    res.status(401).json({ message: "ne mere" });
  }
};
module.exports = verifyToken;
