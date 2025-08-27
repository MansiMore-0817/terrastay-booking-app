const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");
const user = require("../models/user.js");


router.route("/signup")
  .get(userController.renderSignupForm) // Use the renderSignup method from the controller
  .post(wrapAsync(userController.signup)); // Use the signup method from the controller


router.route("/login")
    .get(userController.renderLoginForm)
    .post(
      passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
      }),
      wrapAsync(userController.login)
    );




router.get("/logout", userController.logout); // Use the logout method from the controller

module.exports = router;
