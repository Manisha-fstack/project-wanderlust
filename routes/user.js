const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const { signup } = require("../controllers/user.js");

const userController = require("../controllers/user.js");

router.get("/signup", async(userController.renderSignupForm));


router.post("/signup", async(userController.signup));
    

router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

router.post(
    "/login", saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect:"/login",
        failureFlash: true,
    }),
    async (req, res) => {
        res.flash("welcome back to Wanderlust! You are logged in!");
        res.redirect = res.locals.redirectUrl || "/listings";
    }
);

router.get("/logout", (req, res, next ) => {
    req.logout((err) => {
        if(err) {
          return  next(err);
        }
        req.flash("success", "you are logged out!");
        req.redirect("/listings");
    })
})

module.exports = router;