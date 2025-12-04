// TODO: Create a search endpoint that searches listings by title or description.
// Query parameter: ?q=
// Use case-insensitive regex search.
// Return matched results as JSON.
const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");


router.get("/", wrapAsync(async (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.json([]);
    }
    const regex = new RegExp(q, 'i'); // case-insensitive
    const matchedListings = await Listing.find({
        $or: [
            { title: regex },
            { description: regex }
        ]
    });
    res.json(matchedListings);
}));
module.exports = router;



