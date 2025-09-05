const express = require("express");
const router = express.Router();
const { listingSchema } = require("../schema.js");
const { error } = require("console");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner} = require("../middleware.js");
const listingController = require("../controllers/listing.js");

//validate listing
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

if (error){
  let errMsg = error.details.map((el) => el.message).join(",");
  throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//Index Route
router.get("/", wrapAsync(listingController.index));


// // INDEX route
// router.get("/", async (req, res) => {
//   try {
//     const allListings = await Listing.find({});
//     res.render("listings/index", { allListings });
//   } catch (err) {
//     console.error("Error fetching listings:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });


// NEW route
router.get("/new", isLoggedIn, listingController.renderNewForm);
 
//   res.render("listings/new.ejs");
// });

// SHOW route
router.get("/:id",
  async(listingController.showListing)
); 


// CREATE route
router.post(
  "/", isLoggedIn ,
  validateListing,
   async (listingController.createListing) 
);
   


// EDIT route
router.get("/:id/edit", isLoggedIn
  , isOwner , async(listingController.renderEditForm)
);

// UPDATE route
router.put(
  "/:id",
   isLoggedIn,
   isOwner,
   validateListing,
  async(listingController.updateListing)
);


// DELETE route
router.delete("/:id",isLoggedIn
  , isOwner, async(listingController.destroyListing)
);

module.exports = router;