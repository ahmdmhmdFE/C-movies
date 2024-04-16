import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axInstance } from "../../../utils/axios.instance";

export const moviesAcion = createAsyncThunk(
  "movies/getAll",
  async (currentPage) => {
    const res = await axInstance.get("movie/popular", {
      params: {
        page: currentPage,
      },
    });
    const mlist = res.data.results.slice(0, 12);
    return mlist;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: { mList: [] },
  extraReducers: (builder) => {
    builder.addCase(moviesAcion.fulfilled, (state, action) => {
      state.mList = [...action.payload];
    });
  },
});

export default movieSlice.reducer;
