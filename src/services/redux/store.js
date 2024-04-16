import { configureStore } from "@reduxjs/toolkit";
import favListReducer from "./slices/favListSlice";
import moviesReducer from "./slices/movies";

export default configureStore({
  reducer: {
    favList: favListReducer,
    moviesList: moviesReducer,
  },
});
