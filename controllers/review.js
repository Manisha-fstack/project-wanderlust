const Review = require("../models/review");
const Listing = require("../models/listing");

module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");
    req.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview =  async (req, res) => {
  try {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    

    res.redirect(`/listings/${id}`);
  } catch (err) {
    console.error("Error deleting review:", err);
    res.status(500).send("Internal Server Error");
  }
}