import { createSlice } from "@reduxjs/toolkit";

export const favListSlice = createSlice({
  name: "favList",
  initialState: {
    value: [],
  },
  reducers: {
    addToFav: (state, action) => {
      state.value.push(action.payload);
    },
    removeFromFav: (state, action) => {
      state.value = state.value.filter((e) => e.id != action.payload.id);
    },
  },
});

export const { addToFav, removeFromFav } = favListSlice.actions;

export default favListSlice.reducer;
