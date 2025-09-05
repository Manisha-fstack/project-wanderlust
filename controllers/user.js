

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};


module.exports.signup =
async(req, res) => {
    let {username, email, password} = req.body;
    const newUser = new User({email, username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.logIn(registeredUser, (err) => {
        if(err) {
            return next (err);
        }
    req.flash("success", "welcome to Wanderlust!");
    res.redirect("/listings");
});
    }