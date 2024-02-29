const User = require('./models/user')
const Movie = require('./models/movies.model.js')

//Function for User Signup

 async function signup(userDetails){
  try {
    const { email } = userDetails
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return { success: false, message: 'User already exists' };
    } else {
      const user = new User(userDetails)
      const newUser = await user.save()
      return { success: true, message: 'User created successfully', newUser };
    }
  } catch (error) {
    console.error(error)
  }
}

// signup({
//   email: 'reddy@gmail.com',
//   password: 'password123',
//   profilePicture: 'https://example.com/profile.jpg',
//   username: 'reddy',
//   nickname: 'reddy',
// })

async function login(userCredentials){
  try {
    const { email, password } = userCredentials
    const user = await User.findOne({ email })
    
    if (!user) {
      return { success: false, message: 'User not found' };
    } else {
      if (user.password !== password) {
        return { success: false, message: 'Incorrect password' };
      } else {
        return { success: true, message: 'Login successful', user };
      }
    }
  } catch (error) {
    return error
  }
}

async function changePassword(userCredentials){
  try {
    const { email, password, newPassword } = userCredentials
    const user = await User.findOne({ email })
    if (!user) {
      return { success: false, message: 'User not found' };
    } else {
      if (user.password !== password) {
        return { success: false, message: 'Incorrect password' };
      } else {
        user.password = newPassword
        await user.save()
        return  user 
      }
    }
  }catch(error){
    return error
  }
}

async function updateProfilePicture(userCredentials){
  try {
    const { email, profilePicture } = userCredentials
    const user = await User.findOne({ email })
    if (!user) {
      return { success: false, message: 'User not found' };
    } else {
      user.profilePicture = profilePicture
      await user.save()
      return { success: true, message: 'Profile picture updated successfully', user }
    }
  } catch (error) {
    return error
  }
}

async function updateContactDetails(userCredentials){
  try {
    const { email, phoneNumber, address } = userCredentials
    const user = await User.findOne({ email })
    if (!user) {
      return { success: false, message: 'User not found' };
    } else {
      user.phoneNumber = phoneNumber
      user.address = address
      await user.save()
      return { success: true, message: 'Contact details updated successfully', user }
    }
  } catch (error) {
    return error
  }
}

async function findUserByPhoneNumber(phoneNumber){
  try {
    const user = await User.findOne({ phoneNumber })
    if (!user) {
      return { success: false, message: 'User not found' };
    } else {
      return { success: true, message: 'User found', user };
    }
  } catch (error) {
    return error
  }
}


async function addRatingAndReview({movieId, review}){
  try {
    const movieToBeUpdated = await Movie.findById(movieId)
    // const user = await User.findOne({ email })
    movieToBeUpdated.reviews.push({ user: user._id, text: review })
    await movieToBeUpdated.save();
    return movieToBeUpdated
  } catch (error) {
    return error
  }
}

async function getTopRatingsAndReviews(movieId){
  try {
    const movie = await Movie.findById(movieId)
    const topReviews = movie.reviews.sort((a, b) => b.rating - a.rating).slice(0, 5)
    return topReviews
  } catch (error) {
    return error
  }
}

async function getBottomRatingsAndReviews(movieId){
  try {
    const movie = await Movie.findById(movieId)
    const bottomReviews = movie.reviews.sort((a, b) => a.rating - b.rating).slice(0, 5)
    return bottomReviews
  } catch (error) {
    return error
  }
}


//step10
async function getReviewsWithUserDetails(movieId){
  try{
    const movie = await Movie.findById(movieId)
    const firstThreeReviews = movie.reviews.slice(0,3)
    
    const reviewsWithUserDetails = await Promise.all(
        firstThreeReviews.map( async (review) => {
      const user =await User.findById(review.user)
      return {
        user: {
          _id: user._id,
          email: user.email,
          username: user.username
        },
        text: review.text,
        rating: review.rating,
      }
      })
      )
    return reviewsWithUserDetails
  }catch(error){
    return error
  }
}

module.exports = {
  signup,
  login, 
  changePassword,
  updateProfilePicture,
  updateContactDetails,
  findUserByPhoneNumber,
  addRatingAndReview,
  getTopRatingsAndReviews,
  getBottomRatingsAndReviews,
  getReviewsWithUserDetails
}
