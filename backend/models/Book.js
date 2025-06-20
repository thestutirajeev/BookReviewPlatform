const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Book title is required'],
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    genre: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: 'https://img.freepik.com/free-vector/bike-guy-wattpad-book-cover_23-2149452163.jpg?t=st=1750344662~exp=1750348262~hmac=256691593a92acb66671ff4eda14ebbacd6f312e754c4581f95494da29209932&w=1380', // URL to the cover image
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);