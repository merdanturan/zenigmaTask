import { createSlice } from '@reduxjs/toolkit';


const auth = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user") || null,
  },
  reducers: {
    setUser (state, action) {
      state.user = action.payload;
      localStorage.setItem("user", action.payload)
    }
  },
});

export const { setUser } = auth.actions;

export default auth.reducer;