const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
 const MONGO_URL = "mongodb+srv://moremansi08:Mansirupesh0808@listings.jahozwq.mongodb.net/wanderlust?retryWrites=true&w=majority";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.redirect("/listings");
});


// Index Route
app.get("/listings", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings, layout: "layouts/boilerplate" });
}));

//New Route
app.get("/listings/new", wrapAsync(async (req, res) => {
  res.render("listings/new.ejs", { layout: "layouts/boilerplate" });
}));

// Show Route
app.get("/listings/:id", wrapAsync(async (req, res, next) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    return next(new ExpressError(404, "Listing not found"));
  }
  res.render("listings/show.ejs", { listing, layout: "layouts/boilerplate" });
}));


// Create Route
app.post(
  "/listings",
  wrapAsync(async (req, res, next) => {
  if (!req.body.listing) {
      throw new ExpressError(400, "Invalid Listing Data");
  }
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
})
);

// Edit Route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing, layout: "layouts/boilerplate" });
}));

// Update Route
app.put("/listings/:id", wrapAsync(async (req, res) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "Invalid Listing Data");
  }
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
}));

// Delete Route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
}));

// app.get("/testListing",async (req, res)=> {
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By The Beach",
//         price: 1200,
//         location: "Calanguta, Goa",
//         country: "India"
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode= 500, message="Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", {message});
  // res.status(statusCode).send(message);
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});