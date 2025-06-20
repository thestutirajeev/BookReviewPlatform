import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Optional: load user from localStorage
const userInfo = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

export const login = createAsyncThunk('user/login', async ({ email, password }, thunkAPI) => {
  try {
    //const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, { email, password });
    const fullUser = { ...res.data.user, token: res.data.token}; //flatten
    localStorage.setItem('user', JSON.stringify(fullUser));
    return fullUser;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const register = createAsyncThunk('user/register', async (userData, thunkAPI) => {
  try {
    //const res = await axios.post('http://localhost:5000/api/users/register', userData);
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, userData);
    const fullUser = { ...res.data.user, token: res.data.token }; //flatten
    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify(fullUser));
    return fullUser;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const logout = createAsyncThunk('user/logout', async () => {
  localStorage.removeItem('user');
});

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ id, updatedData, token }, thunkAPI) => {
    try {
      /*const res = await axios.put(`http://localhost:5000/api/users/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });*/
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem('user', JSON.stringify( res.data ));
      return res.data ;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: userInfo,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default userSlice.reducer;
