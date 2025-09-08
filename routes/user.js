const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync");
const userController = require("../controllers/user.js");

router.route("/signup")
 .get(wrapAsync(userController.renderSignupForm))
 .post(wrapAsync(userController.signup));

router.route("/login")
 .get((req, res) => {
    res.render("users/login.ejs");})
    .post(
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect:"/login",
        failureFlash: true,
    }),
    userController.login
);


router.get("/logout", (req, res, next) => {
   userController.logout(req, res, next);
});


module.exports = router;