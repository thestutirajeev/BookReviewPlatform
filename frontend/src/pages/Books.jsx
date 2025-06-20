import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../features/books/bookSlice';
import BookCard from '../components/BookCard';
import { motion } from 'framer-motion';

export default function Books() {
  const dispatch = useDispatch();
  const { books, loading, error, totalPages, currentPage } = useSelector(state => state.books);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchBooks({ search, category, page }));
  }, [dispatch, search, category, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page
    dispatch(fetchBooks({ search, category, page: 1 }));
  };

  const categories = [    'Fiction', 'Non-fiction', 'Sci-fi', 'Mystery', 'Fantasy', 'Poetry',
    'Romance','Comics','Novel','Other'];
return (
  <section className="min-h-screen px-6 py-12 bg-[#F9FAFB]">
    <div className="max-w-6xl mx-auto text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-bold mb-4 text-[#01B5C5]"
      >
        Browse Books
      </motion.h1>

      <motion.form
        onSubmit={handleSearch}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-wrap justify-center gap-4 mb-10"
      >
        <input
          type="text"
          placeholder="Search by title or author"
          className="border border-gray-300 p-3 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border border-gray-300 p-3 rounded-lg w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat.toLowerCase()}>
              {cat}
            </option>
          ))}
        </select>
      </motion.form>

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
        {Array.isArray(books) && books.length > 0 ? (
          books.map((book) => <BookCard key={book._id} book={book} />)
        ) : !loading ? (
          <p className="col-span-full text-gray-600">No books found.</p>
        ) : null}
      </motion.div>

      <div className="flex justify-center mt-10 gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
              currentPage === i + 1
                ? 'bg-[#01B5C5] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  </section>
);

}
