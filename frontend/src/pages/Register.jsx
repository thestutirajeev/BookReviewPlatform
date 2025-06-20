import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/users/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(register({ name, email, password }));
    if (res.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  };

  return (
  <div className="flex justify-center mt-12 px-4">
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-md animate-fade-in transition-all duration-700"
    >
      <h2 className="text-2xl font-extrabold mb-6 text-[#01B5C5] tracking-wide">
        Register
      </h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition duration-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition duration-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition duration-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        className="bg-[#01B5C5] text-white px-5 py-3 rounded-lg w-full font-semibold hover:bg-[#01B5C5] transition duration-300 transform hover:scale-[1.02]"
      >
        Register
      </button>
    </form>
  </div>
);

}
