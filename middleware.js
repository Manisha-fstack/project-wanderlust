const ExpressError = require("./utils/ExpressError.js");
const { reviewSchema} = require("./schemas.js");
const Listing = require("./models/listing");
const { default: mongoose } = require("mongoose");
const Review = require("./models/review.js");

module.exports.isLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()) {
    req.flash("error", "you must be logged in to create listing!");
    return res.redirect("/login");
  }
  next();
};


module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next ) => {
  let { id } = req.params;
   let listing = await Listing.findById(id);
     if(!listing.owner.equals(req.user._id)) {
    req.flash("error", "you are not the owner of this listing");
    res.redirect(`/listings/${id}`);
   }
   next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(errMsg, 400);
  } else {
    next();
  }
};

// middleware.js ends here