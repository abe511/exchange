import { configureStore } from "@reduxjs/toolkit";
import pairSelectorSlice from "../features/selector/pairSelectorSlice";
import buyOrdersSlice from "../features/orders/buyOrdersSlice";

export const store = configureStore({
  reducer: {
    pairSelector: pairSelectorSlice,
    buyOrders: buyOrdersSlice,
  }
});