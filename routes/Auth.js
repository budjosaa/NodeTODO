const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validateService = require("../services/ValidationService");

router.post(
  "/register",
  validateService.validateRegistrationForm,
  authController.registerUser
);
router.post(
  "/login",
  validateService.validateLoginForm,
  authController.loginUser
);

module.exports = router;
