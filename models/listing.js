const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
      type:   String,
      required: true,
    },
    description: String,
    image: {
        type: String,
        default: "https://unsplash.com/photos/a-buddha-statue-and-traditional-architecture-are-shown-w3aed868Iqw",
        set: (v) => v === ""
         ? "https://unsplash.com/photos/a-buddha-statue-and-traditional-architecture-are-shown-w3aed868Iqw"
        : v,
    },    
    price: Number,
    location: String,
    country: String
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;