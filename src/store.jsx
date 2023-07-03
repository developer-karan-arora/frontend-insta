import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./context/AuthSlice";

const store = configureStore({
  reducer: {
    globalAuth:authSlice
  },
});
export default store;
