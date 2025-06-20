import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../features/users/userSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedData = { name, email };
    if (password) updatedData.password = password;

    dispatch(updateProfile({ id: user._id, updatedData, token: user.token }))
      .unwrap()
      .then(() => setMessage('Profile updated!'))
      .catch(() => setMessage(null));
  };

  return (
  <section className="min-h-screen px-6 py-12 bg-[#F9FAFB]">
    <div className="max-w-md mx-auto bg-white p-8 shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-[#01B5C5] text-center">
        Your Profile
      </h2>

      {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}
      {message && <p className="text-green-500 text-sm mb-3 text-center">{message}</p>}

      <form onSubmit={handleUpdate} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">New Password (optional)</label>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="bg-[#01B5C5] text-white px-5 py-3 rounded-lg w-full font-semibold hover:bg-[#09acbe] transition transform hover:scale-[1.02]"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  </section>
);

}
