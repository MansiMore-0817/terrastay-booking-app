const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");

const reviewController = require("../controllers/reviews.js");

// Reviews
// POST route
router.post(
  "/",
  isLoggedIn,
  // Middleware to validate the review data
  validateReview,
  wrapAsync(reviewController.createReview)
);

// DELETE route
router.delete(
  "/:reviewId",
  isReviewAuthor,
  // Middleware to check if the user is logged in
  isLoggedIn,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
