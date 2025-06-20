import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (bookId) => {
    const res = await axios.get(`http://localhost:5000/api/reviews?bookId=${bookId}`);
    return res.data;
  }
);

export const submitReview = createAsyncThunk(
  'reviews/submitReview',
  async ({ bookId, rating, comment, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/reviews',
        { bookId, rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      });
  },
});

export default reviewSlice.reducer;
