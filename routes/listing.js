const express = require("express");
const router = express.Router();
const { listingSchema } = require("../schemas.js");
const {isLoggedIn, isOwner} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");


//validate listing
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);

if (error){
  let errMsg = error.details.map((el) => el.message).join(",");
  throw new ExpressError( errMsg, 400);
  } else {
    next();
  }
};

//index, create 
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(  
    isLoggedIn,
     upload.single("listing[image]"),
     validateListing,
     wrapAsync(listingController.createListing)
   );
  

// NEW route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// SHOW, UPDATE, DELETE routes
router
 .route("/:id")
 .get(wrapAsync(listingController.showListing))
 .put(
   isLoggedIn,
   isOwner,
   upload.single("listing[image]"),
   validateListing,
  wrapAsync(listingController.updateListing))
 .delete(isLoggedIn
  , isOwner, wrapAsync(listingController.destroyListing)
);
 

// EDIT route
router.get("/:id/edit", isLoggedIn
  , isOwner , wrapAsync(listingController.renderEditForm)
);

// search listing 


module.exports = router;