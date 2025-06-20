import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../features/books/bookSlice';
import BookCard from '../components/BookCard';
import { motion } from 'framer-motion';

export default function Home() {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks({ page: 1, limit: 100 }));
  }, [dispatch]);

  const topRatedBooks = [...books]
    .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
    .slice(0, 3);

  //If no books are available, show a message
  if (!loading && !error && topRatedBooks.length === 0) {
    return <p className="text-gray-500">No books available at the moment.</p>;
  }
return (
  <section className="px-6 py-12 bg-[#F9FAFB] min-h-screen">
    {/* Small Msg to show credentials to everyone for testing */}
    <div className="text-center mb-8">
      <p className="text-gray-500">Use email: <strong>admin@gmail.com</strong> and password: <strong>password</strong> for testing admin access, and register with any email to test user access.</p>
    </div>
    <div className="max-w-6xl mx-auto text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-bold mb-8 text-[#01B5C5]"
      >
        Featured Books
      </motion.h1>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {topRatedBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </motion.div>
    </div>
  </section>
);

}
