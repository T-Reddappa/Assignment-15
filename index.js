const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const {
  signup,
  login,
  changePassword,
  updateProfilePicture,
  updateContactDetails,
  findUserByPhoneNumber,
  addRatingAndReview,
  getTopRatingsAndReviews,
  getBottomRatingsAndReviews,
  getReviewsWithUserDetails,
} = require("./controllers");

require("./server");

app.get("/", (req, res) => {
  res.send("Assignment-15!");
});

//ex01: user signup API

app.post("/signup", async (req, res) => {
  try {
    const userDetails = req.body;
    console.log(userDetails);
    const newUser = await signup(userDetails);
    console.log(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const userCredentials = req.body;
    const user = await login(userCredentials);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//ex06: finding User by Phone Number API
app.get("/user/phone/:phoneNumber", async (req, res) => {
  try {
    const user = await findUserByPhoneNumber(req.params.phoneNumber);
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//changing password
app.post("/user/:userId/password", async (req, res) => {
  try {
    const userCredentials = req.body;
    const updatedUser = await changePassword(userCredentials);
    res
      .status(200)
      .json({ message: "Password changed Successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//ex04: updating Profile Picture API
app.post("/update-profile-picture", async (req, res) => {
  try {
    const userDetails = req.body;
    const updatedUser = await updateProfilePicture(userDetails);
    res
      .status(200)
      .json({ message: "Profile Picture Updated Successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//ex05: updating Contact Details API
app.post("/update-contact/:email", async (req, res) => {
  try {
    const updatedUserDetails = await updateContactDetails(req.body);
    res.status(200).json({
      message: "Contact Details Updated Successfully",
      updatedUserDetails,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//ex07: adding Rating and Review API
app.post("/movies/:movieId/rating", async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const review = req.body;
    const updatedMovie = await addRatingAndReview(movieId, review);
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json(erro);
  }
});

//ex08: movie Reviews with User Details API
app.get("/movies/:movieId/reviews", async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const reviews = await getReviewsWithUserDetails(movieId);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json(error);
  }
});

//server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
