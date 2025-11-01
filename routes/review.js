const express = require("express");
const router = express.Router({mergeParams: true});
const { reviewSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const reviewController =
 require("../controllers/review.js");



//validate review 
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error){
  let errMsg = error.details.map((el) =>
     el.message).join(",");
  throw new ExpressError(errMsg, 400);
  } else {
    next();
  }
};

const {
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

//review post
router.post("/",
  isLoggedIn,
  validateReview, 
  wrapAsync(reviewController.createReview)
);


//delete review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview));

module.exports = router;
