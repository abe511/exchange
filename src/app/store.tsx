import { configureStore } from "@reduxjs/toolkit";
import selectorSlice from "../features/selector/pairSelectorSlice";


export const store = configureStore({
  reducer: {
    selector: selectorSlice
  }
});