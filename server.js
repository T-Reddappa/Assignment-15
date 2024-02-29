const express = require('express')
const mongoose = require('mongoose')

const mongoURL = process.env.MONGODB

//connect to mongoDB database
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB'))
