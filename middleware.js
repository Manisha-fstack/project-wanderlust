const Listing = require("./models/listing");
const ExpressError = require("../utils/ExpressError.js");
const { listingschema , reviewSchema} = require("../schema.js");

module.exports.isLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()) {
    req.flash("error", "you must be logged in to create listing!");
    return res.redirect("/login");
  }
  next();
};


module.exports.savRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next ) => {
  let { id } = req.params;
   let Listing = await Listing.findById(id);
     if(!listing.owner.equals(currUser._id)) {
    req.flash("error", "you are not the owner of this listing");
    res.redirect(`/listings/${id}`);
   }
   next();
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
