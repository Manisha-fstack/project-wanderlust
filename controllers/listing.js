const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id)
  .populate({
    path: "reviews",
    populate: {
       path: "author" ,

    },   // populate review.author
  })
  .populate("owner");
    if (!listing) {
      req.flash("error", "Listing does not exist");
      return res.redirect("/listings");
    }

    res.render("listings/show", { listing });
  } catch (err) {
    console.error("Error fetching listing:", err);
    res.status(500).send(err);
  }
};

module.exports.createListing =
async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = {url, filename};
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
  };

module.exports.renderEditForm =
async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing does not exist");
    return res.redirect("/listings");
  }
  let originalImage = listing.image.url;
  originalImage = originalImage.replace("/upload", "/upload/h_300,w_300")
  res.render("listings/edit.ejs", { listing, originalImage});
  };


module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true, runValidators: true });
  
  if (req.file) {
    const url = req.file.path;
    const filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing =
async (req, res) => {
  try {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log("Deleted:", deletedListing);
    res.redirect("/listings");
  } catch (err) {
    console.error("Error deleting listing:", err);
    res.status(500).send("Internal Server Error");
  }
};
