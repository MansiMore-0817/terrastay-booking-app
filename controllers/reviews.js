const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");

module.exports.createReview =async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id; // Set the author of the review to the current user
    console.log(newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New review added!");

    res.redirect(`/listings/${listing._id}`); // Redirect to the listing's show page after saving the review
  }


module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    
    req.flash("success", "Review deleted!");
    res.redirect(`/listings/${id}`);
  }