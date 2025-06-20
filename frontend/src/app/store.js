import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/books/bookSlice';
import userReducer from '../features/users/userSlice';
import reviewReducer from '../features/reviews/reviewSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    user: userReducer,
    reviews: reviewReducer,
  },
});
