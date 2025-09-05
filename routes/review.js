const express = require("express");
const router = express.Router({mergeParams: true});
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { error } = require("console");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");


const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

const reviewController = require("../controllers/review.js");

//validate review 
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);

if (error){
  let errMsg = error.details.map((el) => el.message).join(",");
  throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//review post
router.post("/",
  isLoggedIn,
  validateReview, 
  async(reviewController.createReview)
);


//delete review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isRewviewAuthor,
  async(reviewController.destroyReview));

module.exports = router;
