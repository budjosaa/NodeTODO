const express = require("express");
const router = express.Router();
const validateService = require("../services/ValidationService");
const AuthService = require("../services/AuthService");
router.post(
  "/register",
  validateService.validateRegistrationForm,
  (req, res, next) =>
    AuthService.registerUser({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    })
      .then(data => res.send(data))
      .catch(err => next(err))
);

router.post("/login", validateService.validateLoginForm, (req, res, next) =>
  AuthService.loginUser({
    email: req.body.email,
    password: req.body.password
  })
    .then(data => res.send(data))
    .catch(err => next(err))
);

module.exports = router;
