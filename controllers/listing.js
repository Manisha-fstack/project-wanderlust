const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing =
async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id)
    .populate("reviews").populate("owner");
    res.render("/show", { listing });
  } catch (err) {
    console.error("Error fetching listing:", err);
    res.status(500).send("Internal Server Error");
  } if (!listing) {
    req.flash("error", "listing does not exist");
    res.redirect("/listing");
  }
};

module.exports.createListing =
async (req, res) => {
   const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
   };

module.exports.renderEditForm =
async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing });
  } catch (err) {
    console.error("Error loading edit form:", err);
    res.status(500).send("Internal Server Error");
  }  }; if (!listing) {
    req.flash("error", "listing does not exist");
    res.redirect("/listing");
  };


module.exports.updateListing =
 async (req, res) => {
   let { id } = req.params;
   let Listing = await Listing.findById(id);
   await Listing.findByIdAndUpdate(id, { ...req.body.listing });
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

