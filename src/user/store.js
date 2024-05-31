import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../user/counterSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
