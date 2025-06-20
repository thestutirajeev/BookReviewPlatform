import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookById } from '../features/books/bookSlice';
import { fetchReviews, submitReview } from '../features/reviews/reviewSlice';

export default function BookDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { book, loading: bookLoading } = useSelector((state) => state.books);
  const { reviews, loading: reviewsLoading } = useSelector((state) => state.reviews);
  const { user } = useSelector((state) => state.user);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(fetchBookById(id));
    dispatch(fetchReviews(id));
  }, [dispatch, id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!user) return alert('Login to review');

    dispatch(
      submitReview({
        bookId: id,
        rating,
        comment,
        token: user.token,
      })
    );
    setRating(5);
    setComment('');
  };

  return (
    <div className="p-4">
      {bookLoading ? (
        <p>Loading book...</p>
      ) : (
        <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded">
          <img
            src={book?.coverImage || 'https://img.freepik.com/free-vector/bike-guy-wattpad-book-cover_23-2149452163.jpg?t=st=1750344662~exp=1750348262~hmac=256691593a92acb66671ff4eda14ebbacd6f312e754c4581f95494da29209932&w=1380'}
            alt={book?.title}
            className="w-full h-64 object-cover rounded mb-4"
          />
          <h2 className="text-2xl font-bold mb-2">{book?.title}</h2>
          <p className="text-gray-600 mb-1">Author: {book?.author}</p>
          <p className="text-yellow-500 mb-4">⭐ {book?.averageRating?.toFixed(1)} / 5</p>
          <p className="mb-4">{book?.description}</p>
        </div>
      )}

      <div className="mt-8 max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold mb-2">Reviews</h3>
        {reviewsLoading ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow p-4 mb-3 rounded border-l-4 border-yellow-400"
            >
              <p className="font-semibold">{review.user.name}</p>
              <p className="text-yellow-600 text-sm">Rating: {review.rating}</p>
              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>

      {user && (
        <div className="mt-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-2">Write a Review</h3>
          <form onSubmit={handleReviewSubmit} className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="border p-2 rounded w-full"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Star{r > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border p-2 rounded w-full"
                rows={4}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
