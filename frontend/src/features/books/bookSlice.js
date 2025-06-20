import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/books';

// Async thunk to fetch all books
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async ({ search = '', category = '', page = 1, limit = 6 }) => {
    const query = new URLSearchParams({ search, category, page, limit }).toString();
    const res = await axios.get(`http://localhost:5000/api/books?${query}`);
    return res.data; // Expected: { books: [], totalPages: N }
  }
);

// Async thunk to fetch a single book
export const fetchBookById = createAsyncThunk('books/fetchBookById', async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
});

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    book: null,
    loading: false,
    error: null,
    totalPages: 1, // For pagination
    currentPage: 1, // Current page for pagination
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all books
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload.books;
        state.totalPages = action.payload.totalPages; // Set total pages for pagination
        state.currentPage = action.payload.currentPage || 1; // Set current page
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch single book
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default bookSlice.reducer;
