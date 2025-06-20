import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddBook() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    coverImage: '',
    genre: '',
  });
  const [message, setMessage] = useState(null);

  if (!user || !user.isAdmin) {
    return <p className="text-center mt-10 text-red-500">Access denied. Admins only.</p>;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/books', formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setMessage('Book added successfully!');
      setTimeout(() => navigate('/books'), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error adding book.');
    }
  };

return (
  <section className="min-h-screen px-6 py-12 bg-[#F9FAFB]">
    <div className="max-w-lg mx-auto bg-white p-8 shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-[#01B5C5] text-center">
        Add a New Book
      </h2>

      {message && <p className="text-green-600 mb-4 text-center">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="title"
          placeholder="Book Title"
          onChange={handleChange}
          value={formData.title}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          required
        />

        <input
          name="author"
          placeholder="Author"
          onChange={handleChange}
          value={formData.author}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={formData.description}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          rows="4"
        />

        <input
          name="coverImage"
          placeholder="Cover Image URL"
          onChange={handleChange}
          value={formData.coverImage}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />

        <select
          name="genre"
          onChange={handleChange}
          value={formData.genre || ''}
          className="w-full p-3 border border-gray-300 rounded-lg max-h-40 overflow-y-auto focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          required
        >
          <option value="">Select Genre</option>
          {[
            'Fiction', 'Non-fiction', 'Sci-fi', 'Mystery', 'Fantasy', 'Poetry',
            'Romance', 'Comics', 'Novel', 'Other',
          ].map((genre) => (
            <option key={genre} value={genre.toLowerCase()}>
              {genre}
            </option>
          ))}
        </select>

        <button className="bg-[#01B5C5] text-white px-5 py-3 rounded-lg w-full font-semibold hover:bg-[#09acbe] transition transform hover:scale-[1.02]">
          Submit Book
        </button>
      </form>
    </div>
  </section>
);

}
