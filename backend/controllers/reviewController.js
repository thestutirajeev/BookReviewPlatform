const Review = require('../models/Review');
const Book = require('../models/Book');

const getReviews = async (req, res) => {
  const { bookId } = req.query;
  const reviews = await Review.find({ book: bookId }).populate('user', 'name');
  res.json(reviews);
};

const addReview = async (req, res) => {
  const { bookId, rating, comment } = req.body;

  const review = new Review({
    user: req.user._id,
    book: bookId,
    rating,
    comment,
  });

  await review.save();

  // Update Book rating
  const reviews = await Review.find({ book: bookId });
  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  await Book.findByIdAndUpdate(bookId, {
    averageRating: avgRating,
    totalReviews: reviews.length,
  });

  res.status(201).json(review);
};

module.exports = { getReviews, addReview };
