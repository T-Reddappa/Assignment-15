const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: String,
  releaseYear: Number,
  genre: [{
    type: String,
    enum: ['Action', 'Drama', 'Comedy', 'Romance', 'Thriller', 'Fantasy', 'Sci-Fi', 'Horror', 'Sports', 'Musical', 'Other']
  }],
  director: String,
  ratings: Number,
  reviews: [
    {
      user: {
        type:Object,
        ref: 'User'
      },
      text: String,
      ratings: Number,
    }
  ]
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = { Movie }